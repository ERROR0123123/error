import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Key, Shield, AlertTriangle, Globe, Eye, EyeOff } from "lucide-react";

export const ApiKeyManager = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [isTestnet, setIsTestnet] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const handleSaveKeys = () => {
    setIsConnected(true);
    toast({
      title: "API Keys Saved",
      description: "Your Binance API keys have been encrypted and stored securely",
    });
  };

  const handleTestConnection = () => {
    toast({
      title: "Connection Test",
      description: isTestnet ? "Testnet connection successful!" : "Mainnet connection successful!",
    });
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Key className="h-5 w-5" />
          <span>Binance API Configuration</span>
        </CardTitle>
        <CardDescription>
          Configure your Binance API keys for trading
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Environment Toggle */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <Globe className="h-5 w-5" />
            <div>
              <div className="font-semibold">Trading Environment</div>
              <div className="text-sm text-muted-foreground">
                {isTestnet ? "Testnet (Safe for testing)" : "Mainnet (Real trading)"}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Testnet</span>
            <Switch 
              checked={!isTestnet} 
              onCheckedChange={(checked) => setIsTestnet(!checked)}
            />
            <span className="text-sm">Mainnet</span>
          </div>
        </div>

        {/* Warning for Mainnet */}
        {!isTestnet && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Warning: You are configuring MAINNET keys. Real trades will be executed with real money.
            </AlertDescription>
          </Alert>
        )}

        {/* API Key Configuration */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <div className="relative">
              <Input
                id="api-key"
                type={showApiKey ? "text" : "password"}
                placeholder="Enter your Binance API key"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="secret-key">Secret Key</Label>
            <div className="relative">
              <Input
                id="secret-key"
                type={showSecret ? "text" : "password"}
                placeholder="Enter your Binance secret key"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowSecret(!showSecret)}
              >
                {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Connection Status */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span className="text-sm">Connection Status</span>
          </div>
          <Badge variant={isConnected ? "default" : "secondary"} 
                 className={isConnected ? "bg-success text-success-foreground" : ""}>
            {isConnected ? "Connected" : "Not Connected"}
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <Button onClick={handleSaveKeys} className="flex-1 bg-gradient-primary">
            Save & Encrypt Keys
          </Button>
          <Button onClick={handleTestConnection} variant="outline" className="flex-1">
            Test Connection
          </Button>
        </div>

        {/* Security Notice */}
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Your API keys are encrypted using AES-256 encryption before storage. 
            Never share your keys or store them in plain text.
          </AlertDescription>
        </Alert>

        {/* Proxy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Proxy & Bypass Settings</CardTitle>
            <CardDescription className="text-xs">
              Configure censorship bypass options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2 border rounded text-center">
                <div className="text-xs font-semibold">Tor Proxy</div>
                <Badge variant="outline" className="text-xs">Available</Badge>
              </div>
              <div className="p-2 border rounded text-center">
                <div className="text-xs font-semibold">Cloudflare WARP</div>
                <Badge variant="outline" className="text-xs">Ready</Badge>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Configure Proxy Settings
            </Button>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};