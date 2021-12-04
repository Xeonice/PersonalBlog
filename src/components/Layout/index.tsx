/** @jsxImportSource @emotion/react */
import Navigation from "../Navigation"
import Footer from "../Footer"

export default function Layout({ children }): JSX.Element {
  // const [colorMode] = useColorMode()
  // const isDark = colorMode === `dark`

  // useEffect(() => {
  //   window.parent.postMessage({ theme: colorMode }, "*")
  // }, [colorMode])

  return (
    // typeof isDark === "boolean" && (
    <main className="bg-white flex flex-col justify-between min-h-screen text-gray-500 py-20 px-11 md:py-36">
      <Navigation />
      {children}
      <Footer />
    </main>
    // )
  )
}
