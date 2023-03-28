import { Globe } from "@/components/assets/icons"
import ArrowUpRight from "@/components/assets/icons/ArrowUpRight"
import { Flex } from "@/components/base/Flex"
import IconButton from "@/components/base/IconButton"
import { Stack } from "@/components/base/Stack"
import { H2Heading } from "@/components/base/Typography"
import clsx from "clsx"
import { PropsWithChildren } from "react"
import {
  useMetadataContext,
  useTokenContext,
  useManagerContext,
  useDaoCollectionQuery,
} from "@public-assembly/dao-utils"
import { useBalance, useContractRead } from "wagmi"
import { aggregatorAbi } from "abi/aggregatorAbi"
import { Hash } from "types"
import { RichText } from "@/components/base/Richtext"
import Label from "@/components/base/Label"
import { buildEtherscanAddressLink } from "@/utils/helpers"
import Button from "@/components/base/Button"
import Link from "next/link"

export default function AboutPage() {
  const { metadataSettings } = useMetadataContext()
  const { tokenSettings } = useTokenContext()
  const { daoAddresses } = useManagerContext()
  const { ownerCount } = useDaoCollectionQuery({
    tokenAddress: metadataSettings?.token,
  })

  const { data } = useBalance({
    address: daoAddresses?.treasuryAddress as Hash,
  })

  const { data: latestRoundData } = useContractRead({
    address: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    abi: aggregatorAbi,
    functionName: "latestRoundData",
  })

  const ethUsd = Number(latestRoundData?.answer.toString().substring(0, 4))

  return (
    <Stack className="gap-10 px-4 pt-10 lg:px-10">
      <IconButton
        icon={<Globe />}
        tooltip="website"
        href={`${metadataSettings?.projectURI}`}
      />
      <RichText
        className="max-w-xl body"
        html={metadataSettings?.description as string}
      />

      <Flex className="gap-6">
        <Card className="px-6 py-4">
          <Stack>
            <H2Heading>{ownerCount}</H2Heading>
            <div className="text-black">Owners</div>
          </Stack>
        </Card>
        <Card className="px-6 py-4">
          <Stack>
            {tokenSettings ? (
              <H2Heading>{tokenSettings[2]?.toNumber() - 1}</H2Heading>
            ) : null}
            <div className="text-black">Total Supply</div>
          </Stack>
        </Card>
      </Flex>
      <Flex className="flex-wrap w-full gap-6 text-black">
        <Card className="flex justify-center items-center">
          <span className="ml-4">
            Treasury balance Ξ {Number(data?.formatted).toFixed(3)}
          </span>
          <Button className="text-center" variant="link">
            <Link
              href={buildEtherscanAddressLink(
                daoAddresses?.treasuryAddress as Hash
              )}
            >
              <ArrowUpRight className="text-tertiary" />
            </Link>
          </Button>
        </Card>
        <Card className="px-4 py-2">
          Treasury balance in USD ${" "}
          {(Number(data?.formatted) * ethUsd).toLocaleString()}
        </Card>
        {/* <Card className="px-4 py-2">Total auction sales Ξ 7.3556</Card> */}
      </Flex>
    </Stack>
  )
}

function Card({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx("bg-white rounded-md w-fit h-fit", className)}>
      {children}
    </div>
  )
}
