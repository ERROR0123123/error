import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, TrendingUp, TrendingDown } from "lucide-react";

export const TradeHistory = () => {
  const trades = [
    {
      id: 1,
      pair: "BTCUSDT",
      side: "buy",
      amount: 0.05,
      price: 44200,
      total: 2210,
      time: "2 hours ago",
      status: "completed"
    },
    {
      id: 2,
      pair: "ETHUSDT",
      side: "sell",
      amount: 1.2,
      price: 1800,
      total: 2160,
      time: "4 hours ago",
      status: "completed"
    },
    {
      id: 3,
      pair: "BNBUSDT",
      side: "buy",
      amount: 5.0,
      price: 310,
      total: 1550,
      time: "1 day ago",
      status: "completed"
    },
    {
      id: 4,
      pair: "BTCUSDT",
      side: "buy",
      amount: 0.1,
      price: 43500,
      total: 4350,
      time: "2 days ago",
      status: "completed"
    }
  ];

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <History className="h-5 w-5" />
          <span>Trade History</span>
        </CardTitle>
        <CardDescription>Recent trading activity</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-3">
            {trades.map((trade) => (
              <div key={trade.id} className="p-3 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`p-1 rounded ${
                      trade.side === 'buy' ? 'bg-success/10' : 'bg-danger/10'
                    }`}>
                      {trade.side === 'buy' ? (
                        <TrendingUp className="h-3 w-3 text-success" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-danger" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{trade.pair}</div>
                      <div className="text-xs text-muted-foreground">{trade.time}</div>
                    </div>
                  </div>
                  <Badge 
                    variant={trade.side === 'buy' ? 'default' : 'secondary'}
                    className={trade.side === 'buy' ? 'bg-success text-success-foreground' : 'bg-danger text-danger-foreground'}
                  >
                    {trade.side.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="text-muted-foreground">Amount</div>
                    <div className="font-semibold">{trade.amount}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Price</div>
                    <div className="font-semibold">${trade.price.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Total</div>
                    <div className="font-semibold">${trade.total.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};