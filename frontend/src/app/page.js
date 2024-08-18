"use client"
import Categories from '@/components/Categories';
import MyCarousel from '@/components/MyCarousel';
import BottomSection from '@/components/BottomSection';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();
  // Define paths where you don't want to show the content
  const hideContentOnPaths = ['/signin', '/register'];

  return (
    <>
      {/* Only render content if the current path is not in hideContentOnPaths */}
      {!hideContentOnPaths.includes(router.pathname) && (
        <div className='h-screen'>
          <MyCarousel />
          <br /> <br />
          <Categories />
          <br /><br /> <br />
          <BottomSection />
          <br /><br />
          <Footer />
        </div>
      )}
    </>
  );
}


