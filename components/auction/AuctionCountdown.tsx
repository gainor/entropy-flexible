import { useCountdown } from "@public-assembly/dao-utils"
import { Caption } from "../base/Typography"

export function AuctionCountdown({ auctionState }: { auctionState: any }) {
  const { countdownString } = useCountdown(auctionState.endTime)

  return (
    <Caption>
      <span className="uppercase">{`${countdownString}`}</span>
    </Caption>
  )
}
