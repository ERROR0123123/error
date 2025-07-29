import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Activity, Settings } from "lucide-react";
import { Portfolio } from "./Portfolio";
import { TradingInterface } from "./TradingInterface";
import { LiveChart } from "./LiveChart";
import { TradeHistory } from "./TradeHistory";
import { ApiKeyManager } from "./ApiKeyManager";

export const TradingDashboard = () => {
  const [selectedPair, setSelectedPair] = useState("BTCUSDT");

  const mockStats = [
    {
      title: "Portfolio Value",
      value: "$12,450.80",
      change: "+2.5%",
      icon: DollarSign,
      trend: "up"
    },
    {
      title: "24h P&L",
      value: "+$324.50",
      change: "+2.67%",
      icon: TrendingUp,
      trend: "up"
    },
    {
      title: "Active Trades",
      value: "3",
      change: "2 BUY, 1 SELL",
      icon: Activity,
      trend: "neutral"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Trading Dashboard</h1>
          <p className="text-muted-foreground">Monitor and execute your crypto trades</p>
        </div>
        <Badge variant="outline" className="border-success text-success">
          <div className="w-2 h-2 bg-success rounded-full mr-2" />
          Live Market Data
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockStats.map((stat, index) => (
          <Card key={index} className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs flex items-center ${
                stat.trend === 'up' ? 'text-success' : 
                stat.trend === 'down' ? 'text-danger' : 'text-muted-foreground'
              }`}>
                {stat.trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
                {stat.trend === 'down' && <TrendingDown className="h-3 w-3 mr-1" />}
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Trading Interface */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chart and Trading */}
        <div className="xl:col-span-2 space-y-6">
          <LiveChart selectedPair={selectedPair} />
          <TradingInterface selectedPair={selectedPair} onPairChange={setSelectedPair} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Portfolio />
          <TradeHistory />
        </div>
      </div>

      {/* Bottom Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            API Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Overview</CardTitle>
              <CardDescription>Top performing cryptocurrencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Market data and additional analytics will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-4">
          <ApiKeyManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};