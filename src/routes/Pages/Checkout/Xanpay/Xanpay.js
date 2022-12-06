import { useRef } from "react"
import { useEffect } from "react"


const Xanpay = () => {
    const xanpay = `<div class="h-96"><script src="https://cdn.xanpay.com/widget/1.widget.js"></script>
    <script>
      (function (w, d, s, o, f, js, fjs) {
        w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
        js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
        js.id = o; js.src = f; js.async = 0; fjs.parentNode.insertBefore(js, fjs);
      }(window, document, 'script', 'widgetName', 'https://cdn.xanpay.com/widget/widget.js'));
      window['widgetName']('init', {
        apiKey: '01000fcca03ea4f5e170a4b3a0f63038',
        currency: 'VND',
        amount: 10000,
        env: 'production',
  
        // Optional params
        isSandbox: true,
        paymentStyles: 'grid',
        widgetSize: 'regular',
        darkMode: false,
      })
    </script>
    <div id="xanpay-widget" class="flex justify-center h-96"></div></div>`

    var htmlobject = document.createElement('div')
    htmlobject.innerHTML = xanpay

    // document.querySelector('#root').appendChild(htmlobject)
    const ref = useRef()

    useEffect(() => {
        ref.current.innerHTML = xanpay
    }, [])

    return (
        <div ref={ref}>

        </div>
    )
}

export default Xanpay