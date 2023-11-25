import Footer from '../src/Components/Footer'
import Heading from '../src/Components/Heading'
import Heroes from '../src/Components/Heroes'
import MarketingLayout from '../src/Layouts/MarketingLayout'

const Introduce = () => {
  return (
    <MarketingLayout>
      <div className="min-h-full flex flex-col dark:bg-[#1F1F1F]">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
    </MarketingLayout>
  )
}

export default Introduce
