import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

export const Portfolio = () => {
  const holdings = [
    { symbol: "BTC", name: "Bitcoin", amount: 0.15, value: 6780, change: 2.5, allocation: 54 },
    { symbol: "ETH", name: "Ethereum", amount: 2.3, value: 4140, change: -1.2, allocation: 33 },
    { symbol: "BNB", name: "Binance Coin", amount: 8.7, value: 1530, change: 3.8, allocation: 13 },
  ];

  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wallet className="h-5 w-5" />
          <span>Portfolio</span>
        </CardTitle>
        <CardDescription>Your current holdings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Total Portfolio Value</div>
        </div>

        <div className="space-y-3">
          {holdings.map((holding) => (
            <div key={holding.symbol} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">{holding.symbol}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{holding.symbol}</div>
                    <div className="text-xs text-muted-foreground">
                      {holding.amount} {holding.symbol}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">
                    ${holding.value.toLocaleString()}
                  </div>
                  <div className={`text-xs flex items-center ${
                    holding.change > 0 ? 'text-success' : 'text-danger'
                  }`}>
                    {holding.change > 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(holding.change)}%
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{holding.allocation}% of portfolio</span>
                  <span className={holding.change > 0 ? 'text-success' : 'text-danger'}>
                    {holding.change > 0 ? '+' : ''}{holding.change}%
                  </span>
                </div>
                <Progress 
                  value={holding.allocation} 
                  className="h-1"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">24h Change</div>
              <div className="font-semibold text-success">+$324.50</div>
            </div>
            <div>
              <div className="text-muted-foreground">Profit/Loss</div>
              <div className="font-semibold text-success">+$1,234.80</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};