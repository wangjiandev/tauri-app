import { useDataServerStatus } from "@/hooks/use-data-server-status";
import { BadgeCheck, BadgeAlert } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function NavFooter() {
  const { status, isListening } = useDataServerStatus();

  return (
    <div className="flex items-center justify-start bg-muted text-foreground p-2 gap-2 rounded-md">
      {status.connected ? (
        <>
          <BadgeCheck className="text-green-500 size-4" />
          <Separator orientation="vertical" />
          <span className="text-xs font-semibold text-muted-foreground">
            已连接
          </span>
        </>
      ) : (
        <>
          <BadgeAlert className="text-red-500 size-4" />
          <Separator orientation="vertical" />
          <span className="text-xs font-semibold text-muted-foreground">
            未连接
          </span>
        </>
      )}
      <Separator orientation="vertical" />
      <p className="text-xs text-muted-foreground">{status.latency}</p>
      {!isListening && (
        <span className="text-xs text-muted-foreground ml-auto">监听中...</span>
      )}
    </div>
  );
}
