import * as React from "react"
import { Web3Storage } from "web3.storage"
import { useThemeContext } from "../context/ThemeProvider"
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi"
import { platformThemeRegistryAbi } from "../abi/platformThemeRegistryAbi"
import { BigNumber } from "ethers"
import { ENV } from "@/utils/env"
import { Pending } from "./assets/icons"
import { useAuth } from "@/hooks/useAuth"
import { Hash } from "types"

function getAccessToken() {
  return ENV.WEB3STORAGE_TOKEN
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() as string })
}

const themeRegistry = "0x9a23AE640040e4d34E9e00E500003000017144F4"

export function Save() {
  const { newMetadata } = useThemeContext()
  const [uri, setUri] = React.useState<string>("")
  const [themeReady, setThemeReady] = React.useState<boolean>(false)
  const [canEdit, setCanEdit] = React.useState<boolean>(false)
  const { address } = useAuth()

  useContractRead({
    address: themeRegistry,
    abi: platformThemeRegistryAbi,
    functionName: "getRole",
    args: [BigNumber.from(ENV.PLATFORM_INDEX), address as Hash],
    onSuccess(getRole) {
      if (getRole === 1 || getRole === 2) {
        setCanEdit(true)
      }
    },
  })

  const { config } = usePrepareContractWrite({
    address: themeRegistry,
    abi: platformThemeRegistryAbi,
    functionName: "setPlatformTheme",
    args: [BigNumber.from(ENV.PLATFORM_INDEX), uri],
    enabled: Boolean(uri),
    onSuccess() {
      setThemeReady(true)
    },
  })

  const { data, write: setTheme, isLoading } = useContractWrite(config)

  useWaitForTransaction({
    hash: data?.hash,
  })

  React.useEffect(() => {
    if (setTheme && themeReady) {
      setTheme()
    }
    setThemeReady(false)
  }, [themeReady])

  async function handleClick() {
    const client = makeStorageClient()
    try {
      const blobThemeData = new Blob([newMetadata])
      // prettier-ignore
      // @ts-ignore
      const cid = await client.put([blobThemeData], { wrapWithDirectory: false });
      const uri = "ipfs://" + cid
      /**
       * Set state variable to cid in uri format
       */
      setUri(uri)
      console.log("Uri:", uri)
    } catch (err) {
      console.error(err)
    }
  }

  if (!canEdit)
    return (
      <div className="flex justify-center bg-white w-full p-4">
        <div className="px-4 py-2 bg-[#F1F4F7] w-full text-center rounded-lg">
          <p className="text-[#576775]">
            You don&apos;t have permissions to save theming data
          </p>
        </div>
      </div>
    )
  return (
    <div className="flex justify-center bg-white w-full p-4">
      <button
        disabled={isLoading}
        className="flex justify-center items-center bg-[#121212] hover:bg-[#121212]/50 active:bg-[#121212] dark:bg-[#121212] dark:text-[#121212] text-[#f2fdf7] text-lg py-3 font-satoshi rounded w-full disabled:hover:none cursor-pointer"
        onClick={handleClick}
      >
        {!isLoading ? "Save" : <Pending className="animate-spin" />}
      </button>
    </div>
  )
}
