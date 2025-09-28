import { useThemeStore } from "../store/useTheme"

const Loader = () => {
  const {theme}=useThemeStore()
  return (
   <div className="min-h-screen flex items-center justify-center p-4 bg-base-100" data-theme={theme}>
        <div className=" loading loading-spinner bg-primary/100 "/>
    </div>

  )
}

export default Loader
