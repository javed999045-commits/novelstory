
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud } from "lucide-react";
import Image from "next/image";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Admin Settings</h1>
            
            <Card>
                <CardHeader>
                    <CardTitle>Payment Settings</CardTitle>
                    <CardDescription>Manage payment information displayed to users.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">UPI QR Code</h3>
                        <div className="grid md:grid-cols-2 gap-6 items-start">
                             <div>
                                <Label>Current QR Code</Label>
                                <div className="mt-2 bg-white p-4 rounded-lg w-fit">
                                     <Image
                                        src="https://placehold.co/200x200/fafafa/000000?text=Your+QR+Code"
                                        alt="Current UPI QR Code"
                                        width={192}
                                        height={192}
                                        className="w-48 h-48"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="qr-upload">Upload New QR Code</Label>
                                 <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-border border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary/80">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" />
                                    </label>
                                </div>
                                <Button className="w-full mt-2">Save QR Code</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
