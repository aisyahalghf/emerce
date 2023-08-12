import Navbar from "../component/Navbar";
import { Icon } from "@iconify/react";
import CardProduct from "../component/CardProduct";
import { Button } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import MainBanner from "../component/MainBanner";
import Banner from "../component/Banner";
import Carousel from "nuka-carousel";
import ramadhanSales from "../asset/banner/ramadhan-sales.png";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

const Home = () => {
  const [allProduct, setAllProduct] = useState([]);
  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const dataProduct = querySnapshot.docs.map((doc) => doc.data());
      setAllProduct(dataProduct);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section>
      <Navbar />
      <div className=" container mx-auto flex flex-col gap-10 mt-5 mb-10 ">
        <Carousel
          renderCenterLeftControls
          renderCenterRightControls
          wrapAround={true}
          autoplay={true}
          autoplayInterval={5000}
          speed={2000}
        >
          <MainBanner
            title={"emerce"}
            title2={
              "Shop for all you need everyday and more from the comfort of your home."
            }
            images={
              "https://imageproxy.wolt.com/venue/62b326af59f6dcbecb57b09e/fbbf146c-300e-11ed-8852-f640312e7d17_list_menu_4.jpg"
            }
            button={"Shop now"}
          />
          <Banner images={ramadhanSales} title="ramadhanSale" />
        </Carousel>

        <div className=" mx-3 md:mx-2 ">
          <h1 className=" font-bold mb-3 text-[#3C6255] text-lg ">
            Categories
          </h1>
          <div className=" flex  overflow-x-auto w-[full] gap-10 shadow shadow-slate-200 p-6 rounded-lg md: justify-between    ">
            <div className=" min-w-fit ">Bumbu</div>
            <div className=" min-w-fit ">Rokok</div>
            <div className=" min-w-fit ">Minuman</div>
            <div className=" min-w-fit ">Sembako</div>
            <div className=" min-w-fit ">Snack</div>
            <div className=" min-w-fit ">Obat- Obatan</div>
          </div>
        </div>
        <div className="mx-3 md:mx-2">
          <div className=" flex justify-between  ">
            <h1 className=" font-bold mb-3 text-[#3C6255] text-lg ">
              All Products
            </h1>
            <Link to={`/product-list/promotion`}>
              <Button
                bg="#3C6255"
                textColor="white"
                className=" font-bold mb-3  text-lg "
                size="xs"
              >
                View All{" "}
                <Icon
                  className="text-[25px]"
                  icon="material-symbols:arrow-right-alt-rounded"
                />
              </Button>
            </Link>
          </div>

          <div className="flex overflow-x-auto w-[full] gap-5 border-x-2 rounded-lg  ">
            {allProduct.map((val, idx) => (
              <div key={idx.toLocaleString()}>
                <CardProduct
                  productid={val.id}
                  image={val.image}
                  name={val.name}
                  description={val.description}
                  price={val.price}
                  discount={val.discount}
                  stock={val.stock}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </section>
  );
};
export default Home;
