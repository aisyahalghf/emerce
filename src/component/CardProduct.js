import { Button, ButtonGroup, Divider, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CardProduct = ({ image, name, description, price, discount, stock }) => {
  let imageSplit = image.split("/");
  let imageItem = `https://drive.google.com/uc?export=view&id=${imageSplit[5]}`;

  const renderDiscount = () => {
    if (discount <= 0) {
      return (
        <Text color="#F99417" fontSize={["11px", "sm"]} fontWeight="bold">
          Rp. {price.toLocaleString()}
        </Text>
      );
    } else {
      return (
        <>
          <Text
            color="gray.500"
            fontSize={["11px", "sm"]}
            as="del"
            fontWeight="semibold"
          >
            Rp. {price.toLocaleString()}
          </Text>
          <Text color="#F99417" fontSize={["11px", "sm"]} fontWeight="bold">
            Rp. {(price - discount).toLocaleString()}
          </Text>
        </>
      );
    }
  };

  const renderStock = () => {
    if (stock <= 0) {
      return (
        <div className=" relative z-0">
          <Link to={`/product/${name}`}>
            <img
              className="object-cover object-center h-[100px] md:h-[160px] m-auto block mt-10  overflow-x-auto "
              src={imageItem}
              alt={imageSplit}
            />
            <div className="absolute text-xs md:text-sm font-bold  px-1 md:px-1 p-0 md:p-2 h-5 md:h-10 rounded-xl bg-black text-white  text-center translate-x-10 md:translate-x-[105px]  translate-y-[-50px] md:translate-y-[-100px]">
              Out Of Stock
            </div>
          </Link>
        </div>
      );
    } else {
      return (
        <Link to={`/product/${name}`}>
          <img
            className="object-cover object-center h-[100px] md:h-[160px] m-auto block mt-10  "
            src={imageItem}
            alt={imageSplit}
          />
        </Link>
      );
    }
  };

  return (
    <div className="flex flex-col  w-[170px] h-[370px]  md:w-[300px] md:h-[480px] shadow  rounded-lg border-y border-slate-200">
      {image ? renderStock() : <div className=" h-[100px] md:h-[430px]"></div>}
      <div className="px-4 py-2 bg-white  w-[170px] h-[200px] md:w-[300px] md:h-[300px] mt-5 pl-2 md:pl-7 ">
        <Heading size={["xs", "sm"]} h={["40px", "35px"]} mb="3">
          <Link to={`/product/${name}`}>{name}</Link>
        </Heading>
        <Text className="  text-[10px] md:h-[40px] md:w-[250px] mb-3 md:text-sm text-gray-600 ">
          {description}
        </Text>
        <div className="flex gap-2 md:gap-4">{renderDiscount()}</div>
      </div>
      <Divider />
      <div>
        <ButtonGroup spacing={["0", "2"]} m={["3", "5"]}>
          <Button
            variant="solid"
            colorScheme="gray"
            rounded="md"
            bgColor="#DEF5E5"
            size={["xs", "sm"]}
            isDisabled={stock === 0}
          >
            Buy now
          </Button>
          <Button
            variant="ghost"
            color="gray.600"
            fontWeight="semibold"
            size={["xs", "sm"]}
            isDisabled={stock === 0}
          >
            Add to cart
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default CardProduct;
