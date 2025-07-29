import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, TrendingDown, Zap } from "lucide-react";

interface TradingInterfaceProps {
  selectedPair: string;
  onPairChange: (pair: string) => void;
}

export const TradingInterface = ({ selectedPair, onPairChange }: TradingInterfaceProps) => {
  const [orderType, setOrderType] = useState("market");
  const [side, setSide] = useState("buy");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const { toast } = useToast();

  const tradingPairs = [
    "BTCUSDT", "ETHUSDT", "BNBUSDT", "ADAUSDT", "SOLUSDT", "DOGEUSDT"
  ];

  const handleTrade = () => {
    toast({
      title: "Trade Executed",
      description: `${side.toUpperCase()} order for ${amount} ${selectedPair.replace('USDT', '')} placed successfully`,
    });
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Trading Interface</span>
            </CardTitle>
            <CardDescription>Execute trades with market orders</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">Testnet</Badge>
            <Select value={selectedPair} onValueChange={onPairChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tradingPairs.map((pair) => (
                  <SelectItem key={pair} value={pair}>
                    {pair}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={side} onValueChange={setSide} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy" className="text-success data-[state=active]:bg-success data-[state=active]:text-success-foreground">
              <TrendingUp className="h-4 w-4 mr-2" />
              Buy
            </TabsTrigger>
            <TabsTrigger value="sell" className="text-danger data-[state=active]:bg-danger data-[state=active]:text-danger-foreground">
              <TrendingDown className="h-4 w-4 mr-2" />
              Sell
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="order-type">Order Type</Label>
                <Select value={orderType} onValueChange={setOrderType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market">Market</SelectItem>
                    <SelectItem value="limit">Limit</SelectItem>
                    <SelectItem value="stop">Stop Loss</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            {orderType === "limit" && (
              <div className="space-y-2">
                <Label htmlFor="price">Price (USDT)</Label>
                <Input
                  id="price"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            )}

            <div className="grid grid-cols-4 gap-2">
              <Button variant="outline" size="sm" onClick={() => setAmount("25")}>
                25%
              </Button>
              <Button variant="outline" size="sm" onClick={() => setAmount("50")}>
                50%
              </Button>
              <Button variant="outline" size="sm" onClick={() => setAmount("75")}>
                75%
              </Button>
              <Button variant="outline" size="sm" onClick={() => setAmount("100")}>
                Max
              </Button>
            </div>

            <div className="p-3 bg-muted rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Available Balance:</span>
                <span className="font-semibold">1,234.56 USDT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Estimated Cost:</span>
                <span className="font-semibold">
                  {amount ? `${parseFloat(amount) * 45200} USDT` : "0.00 USDT"}
                </span>
              </div>
            </div>

            <Button
              onClick={handleTrade}
              className={`w-full ${
                side === "buy" 
                  ? "bg-gradient-success hover:bg-success/90" 
                  : "bg-gradient-danger hover:bg-danger/90"
              }`}
              disabled={!amount}
            >
              {side === "buy" ? "Buy" : "Sell"} {selectedPair.replace('USDT', '')}
            </Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};