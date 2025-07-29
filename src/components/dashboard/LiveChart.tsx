import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface LiveChartProps {
  selectedPair: string;
}

export const LiveChart = ({ selectedPair }: LiveChartProps) => {
  // Mock chart data
  const mockData = [
    { time: "00:00", price: 42500, volume: 1200 },
    { time: "04:00", price: 43200, volume: 1400 },
    { time: "08:00", price: 42800, volume: 1100 },
    { time: "12:00", price: 44100, volume: 1600 },
    { time: "16:00", price: 43700, volume: 1300 },
    { time: "20:00", price: 44500, volume: 1500 },
    { time: "24:00", price: 45200, volume: 1700 },
  ];

  const currentPrice = 45200;
  const priceChange = 2700;
  const percentChange = 6.35;

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>{selectedPair}</span>
            </CardTitle>
            <CardDescription>Live price chart</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">${currentPrice.toLocaleString()}</div>
            <div className="flex items-center text-success">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+${priceChange} (+{percentChange}%)</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Button variant="outline" size="sm">1H</Button>
          <Button variant="outline" size="sm">4H</Button>
          <Button variant="default" size="sm">1D</Button>
          <Button variant="outline" size="sm">1W</Button>
          <Button variant="outline" size="sm">1M</Button>
        </div>
        
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={['dataMin - 1000', 'dataMax + 1000']}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--card-foreground))"
                }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#priceGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">24h High</div>
            <div className="font-semibold">$45,850</div>
          </div>
          <div>
            <div className="text-muted-foreground">24h Low</div>
            <div className="font-semibold">$42,100</div>
          </div>
          <div>
            <div className="text-muted-foreground">24h Volume</div>
            <div className="font-semibold">1,247 BTC</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};