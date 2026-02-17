
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  PlusCircle,
  MoreHorizontal,
  Copy,
  Trash2,
  ToggleLeft,
  ToggleRight,
  KeySquare,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import mockKeys from '@/lib/keys.json';

type Key = {
  key: string;
  uses: number;
  limit: number;
  enabled: boolean;
  expires: string | null;
  createdAt: string;
  lastUsed: string | null;
};

export default function ManageKeysPage() {
  const [keys, setKeys] = useState<Key[]>(mockKeys.keys);
  const { toast } = useToast();

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: 'Key Copied!',
      description: 'The key has been copied to your clipboard.',
    });
  };

  const handleToggle = (keyToToggle: string) => {
    setKeys(currentKeys =>
      currentKeys.map(k =>
        k.key === keyToToggle ? { ...k, enabled: !k.enabled } : k
      )
    );
    toast({
        title: `Key ${keys.find(k=>k.key === keyToToggle)?.enabled ? 'Disabled' : 'Enabled'}`,
    })
  };

  const handleDelete = (keyToDelete: string) => {
    setKeys(currentKeys => currentKeys.filter(k => k.key !== keyToDelete));
    toast({
        title: 'Key Deleted',
        variant: 'destructive'
    })
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <KeySquare /> Manage Login Keys
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Generate New Keys</CardTitle>
          <CardDescription>
            Create single or multiple keys for your users.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="key-type">Usage Limit</Label>
              <Select defaultValue="unlimited">
                <SelectTrigger id="key-type">
                  <SelectValue placeholder="Select limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single Login</SelectItem>
                  <SelectItem value="multiple">Multiple Logins</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="usage-limit">Number of Logins</Label>
              <Input id="usage-limit" type="number" placeholder="e.g., 5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiry-date">Expiry Date (Optional)</Label>
              <Input id="expiry-date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="key-count">Number of Keys</Label>
              <Input id="key-count" type="number" defaultValue="1" />
            </div>
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="multi-use-config" />
            <Label htmlFor="multi-use-config">Is this a multi-use key (e.g. for an event)?</Label>
          </div>
          <Button className="w-full md:w-auto">
            <PlusCircle className="mr-2" /> Generate Keys
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Keys</CardTitle>
          <CardDescription>
            View, manage, and revoke user access keys.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.map(k => (
                <TableRow key={k.key}>
                  <TableCell className="font-mono text-sm">{k.key}</TableCell>
                  <TableCell>
                    <Badge variant={k.enabled ? 'default' : 'destructive'}>
                      {k.enabled ? 'Active' : 'Disabled'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {k.uses} / {k.limit === -1 ? '∞' : k.limit}
                  </TableCell>
                  <TableCell>
                    {k.expires
                      ? new Date(k.expires).toLocaleDateString()
                      : 'Never'}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleCopy(k.key)}>
                          <Copy className="mr-2" /> Copy
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggle(k.key)}>
                          {k.enabled ? (
                            <ToggleLeft className="mr-2" />
                          ) : (
                            <ToggleRight className="mr-2" />
                          )}
                          {k.enabled ? 'Disable' : 'Enable'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(k.key)}
                        >
                          <Trash2 className="mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
