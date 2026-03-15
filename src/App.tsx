import Header from './components/Header'
import Nav from './components/Nav'
import ButtonGlobal from './components/ButtonGlobal'
import WhatWeDo from './components/WhatWeDo'
import PeopleSection from './components/sectionPeople/PeopleSection'
import StatsSection from './components/StatsSection'
import PartnersSection from './components/PartnersSection'
import ProjectsSection from './components/ProjectsSection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app w-full min-h-screen relative">
      <div className="relative z-10">
        <Nav />
        <Header />
        <WhatWeDo id="about"/>
        <div className="bg-black/95 relative scroll-mt-20" id="team">
          <div className="absolute top-0 left-0 md:left-1/12 overflow-visible pointer-events-none w-full h-full max-w-lg opacity-60 md:opacity-100">
            <svg
              className="w-full h-full object-cover overflow-visible"
              viewBox="0 0 654 845"
              fill="none"
              preserveAspectRatio="xMinYMin meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g className="blob-people-green" filter="url(#people-blob-green)">
                <path d="M318.376 197.497C308.397 193.739 296.797 191.227 285.65 189.579C274.503 187.931 277.719 190.201 273.489 191.43C267.026 193.308 264.182 195.05 261.224 198.919C257.941 203.211 253.52 207.184 251.981 211.946C250.19 217.485 250.14 223.444 249.37 229.142C248.112 238.452 249.348 247.378 252.193 256.998C254.435 264.581 255.607 272.136 258.001 279.719C262.081 292.645 269.904 305.403 274.986 318.283C277.769 325.337 279.878 332.428 283.544 339.46C287.386 346.831 294.817 353.752 300.15 360.963L300.309 361.179C304.112 366.323 307.554 370.98 316.681 374.277C325.006 377.285 332.153 379.277 341.555 380.427C351.458 381.639 360.984 382.476 370.584 382.064C376.255 381.821 382.559 382.19 387.057 380.443C392.03 378.51 391.271 374.278 391.443 371.034C391.751 365.237 392.37 359.436 392.225 353.592C392.081 347.786 389.671 341.656 387.328 335.79C385.278 330.659 384.556 325.726 383.506 320.625C381.814 312.413 378.135 304.134 375.461 295.91C373.355 289.434 371.877 282.975 370.635 276.52C368.459 265.209 368.619 253.857 365.134 242.52C363.103 235.909 361.854 228.865 356.686 222.38C352.612 217.266 344.677 212.602 338.054 208.187C332.219 204.298 326.055 200.389 318.376 197.497Z" fill="#0AE58A"/>
              </g>
              <g className="blob-people-blue" filter="url(#people-blob-blue)">
                <path d="M116.789 483.274C112.806 502.901 111.247 525.248 111.013 546.528C110.779 567.809 113.813 561.214 116.789 568.82C121.337 580.442 124.852 585.323 131.907 589.882C139.736 594.94 147.291 602.21 155.506 603.887C165.061 605.837 174.922 604.423 184.513 604.423C200.182 604.423 214.661 599.852 229.928 592.093C241.961 585.978 254.186 581.875 266.186 575.476C286.64 564.568 305.981 546.7 326.135 533.931C337.174 526.937 348.423 521.196 359.228 512.556C370.553 503.5 380.333 487.842 391.062 476.037L391.382 475.684C399.035 467.266 405.964 459.644 409.375 441.729C412.487 425.386 414.184 411.505 413.984 393.618C413.774 374.776 413.029 356.736 410.205 338.873C408.536 328.32 407.738 316.427 403.844 308.451C399.539 299.632 392.713 302.123 387.313 302.622C377.662 303.513 367.934 303.821 358.306 305.57C348.742 307.308 339.148 313.37 329.976 319.24C321.953 324.374 313.959 326.972 305.763 330.229C292.566 335.472 279.704 344.452 266.708 351.537C256.473 357.117 246.127 361.518 235.735 365.475C217.525 372.408 198.725 374.981 180.764 384.371C170.291 389.846 158.926 393.964 149.36 405.277C141.818 414.197 135.881 430.228 130.064 443.739C124.938 455.644 119.854 468.171 116.789 483.274Z" fill="#3AA9FA"/>
              </g>
              <defs>
                <filter id="people-blob-green" x="59.8787" y="0" width="521.368" height="571.17" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feGaussianBlur stdDeviation="94.5" result="blur"/>
                </filter>
                <filter id="people-blob-blue" x="-129" y="61.9182" width="783" height="783" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feGaussianBlur stdDeviation="120" result="blur"/>
                </filter>
              </defs>
            </svg>
          </div>
          <PeopleSection />
          <StatsSection />
          <PartnersSection />
        </div>
        <div className="relative scroll-mt-20" id="work">
          <div className="absolute top-0 right-0 md:right-1/12 overflow-visible pointer-events-none w-full h-full max-w-lg opacity-60 md:opacity-100">
            <svg
              className="w-full h-full object-cover overflow-visible"
              viewBox="0 0 654 845"
              fill="none"
              preserveAspectRatio="xMinYMin meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g className="blob-people-green" filter="url(#people-blob-green)">
                <path d="M318.376 197.497C308.397 193.739 296.797 191.227 285.65 189.579C274.503 187.931 277.719 190.201 273.489 191.43C267.026 193.308 264.182 195.05 261.224 198.919C257.941 203.211 253.52 207.184 251.981 211.946C250.19 217.485 250.14 223.444 249.37 229.142C248.112 238.452 249.348 247.378 252.193 256.998C254.435 264.581 255.607 272.136 258.001 279.719C262.081 292.645 269.904 305.403 274.986 318.283C277.769 325.337 279.878 332.428 283.544 339.46C287.386 346.831 294.817 353.752 300.15 360.963L300.309 361.179C304.112 366.323 307.554 370.98 316.681 374.277C325.006 377.285 332.153 379.277 341.555 380.427C351.458 381.639 360.984 382.476 370.584 382.064C376.255 381.821 382.559 382.19 387.057 380.443C392.03 378.51 391.271 374.278 391.443 371.034C391.751 365.237 392.37 359.436 392.225 353.592C392.081 347.786 389.671 341.656 387.328 335.79C385.278 330.659 384.556 325.726 383.506 320.625C381.814 312.413 378.135 304.134 375.461 295.91C373.355 289.434 371.877 282.975 370.635 276.52C368.459 265.209 368.619 253.857 365.134 242.52C363.103 235.909 361.854 228.865 356.686 222.38C352.612 217.266 344.677 212.602 338.054 208.187C332.219 204.298 326.055 200.389 318.376 197.497Z" fill="#0AE58A"/>
              </g>
              <g className="blob-people-blue" filter="url(#people-blob-blue)">
                <path d="M116.789 483.274C112.806 502.901 111.247 525.248 111.013 546.528C110.779 567.809 113.813 561.214 116.789 568.82C121.337 580.442 124.852 585.323 131.907 589.882C139.736 594.94 147.291 602.21 155.506 603.887C165.061 605.837 174.922 604.423 184.513 604.423C200.182 604.423 214.661 599.852 229.928 592.093C241.961 585.978 254.186 581.875 266.186 575.476C286.64 564.568 305.981 546.7 326.135 533.931C337.174 526.937 348.423 521.196 359.228 512.556C370.553 503.5 380.333 487.842 391.062 476.037L391.382 475.684C399.035 467.266 405.964 459.644 409.375 441.729C412.487 425.386 414.184 411.505 413.984 393.618C413.774 374.776 413.029 356.736 410.205 338.873C408.536 328.32 407.738 316.427 403.844 308.451C399.539 299.632 392.713 302.123 387.313 302.622C377.662 303.513 367.934 303.821 358.306 305.57C348.742 307.308 339.148 313.37 329.976 319.24C321.953 324.374 313.959 326.972 305.763 330.229C292.566 335.472 279.704 344.452 266.708 351.537C256.473 357.117 246.127 361.518 235.735 365.475C217.525 372.408 198.725 374.981 180.764 384.371C170.291 389.846 158.926 393.964 149.36 405.277C141.818 414.197 135.881 430.228 130.064 443.739C124.938 455.644 119.854 468.171 116.789 483.274Z" fill="#3AA9FA"/>
              </g>
              <defs>
                <filter id="people-blob-green" x="59.8787" y="0" width="521.368" height="571.17" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feGaussianBlur stdDeviation="94.5" result="blur"/>
                </filter>
                <filter id="people-blob-blue" x="-129" y="61.9182" width="783" height="783" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feGaussianBlur stdDeviation="120" result="blur"/>
                </filter>
              </defs>
            </svg>
          </div>
          <ProjectsSection />
        </div>
        <Footer />
      </div>
      <div className="fixed bottom-1/12 right-1/12 z-50 hidden md:block" style={{ mixBlendMode: 'difference' }}>
        <ButtonGlobal />
      </div>

    </div>
  )
}

export default App
