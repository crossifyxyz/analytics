import { getUserFields } from '@/lib'
import { setUser, useAppSelector } from '@/lib/store'
import { useRouter, usePathname } from 'next/navigation'
import { createContext, useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'

interface AppContextInterface {}

const AppContext = createContext({} as AppContextInterface)

export default function AppProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // Hooks
  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()
  // States
  const authId = useAppSelector((state) => state.auth.id)

  // CONTEXT
  //==============================================
  const contextData: AppContextInterface = {}
  // EFFECTS
  //==============================================
  // HANDLE AUTH
  useEffect(() => {
    if (
      (!authId && ['/profile', '/portfolio'].includes(pathname)) ||
      (!!authId && ['/login', '/signup'].includes(pathname))
    )
      router.replace('/')

    if (!!authId)
      getUserFields({ id: authId, fields: ['trackedGeckoCoins'] })
        .then(async (res: any) => {
          const trackedGeckoCoins = (await res.json())?.trackedGeckoCoins ?? []
          dispatch(setUser({ trackedGeckoCoins }))
        })
        .catch((err) => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authId])

  // RETURN
  //==============================================
  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
