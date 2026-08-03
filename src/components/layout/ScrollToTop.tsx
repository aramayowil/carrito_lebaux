import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/** Restablece el scroll al cambiar de página y respeta anclas explícitas. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() =>
        document.querySelector(hash)?.scrollIntoView(),
      )
      return
    }
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [hash, pathname])

  return null
}
