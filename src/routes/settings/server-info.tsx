import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export const Route = createFileRoute("/settings/server-info")({
  component: RouteComponent,
});

function RouteComponent() {
  const [server_url, setServerUrl] = useState("");
  const [server_port, setServerPort] = useState("");

  const saveConfig = async () => {
    const message = await invoke("save_redis_config", {
      url: "redis://" + server_url + ":" + server_port,
    });
    console.log(message);
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle>服务器配置</CardTitle>
        <CardDescription>
          配置服务器连接信息,用于内网数据同步传输.(工程师初始化时需要配置,请勿修改)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="server_url">地址</FieldLabel>
                <Input
                  id="server_url"
                  autoComplete="off"
                  placeholder="数据服务器地址"
                  value={server_url}
                  onChange={(e) => setServerUrl(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="server_port">端口</FieldLabel>
                <Input
                  id="server_port"
                  autoComplete="off"
                  placeholder="数据服务器端口"
                  value={server_port}
                  onChange={(e) => setServerPort(e.target.value)}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => saveConfig()}
        >
          保存配置
        </Button>
      </CardFooter>
    </Card>
  );
}
