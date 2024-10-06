import React, { useEffect, useState } from "react";
import { decimal, integer, sign } from "../../data/lens";

const SightInput = ({ id, sendData, submitted, setSubmitted, value }) => {
  const [symbol, setSign] = useState("-");
  const [int, setInteger] = useState("0");
  const [dec, setDecimal] = useState(".00");

  useEffect(() => {
    const valueSign = value > 0 ? "+" : "-";
    let valueStr = value;
    if (value < 0) {
      valueStr = valueStr.slice(1);
    }
    const [valueInt, valueDec] = valueStr.split(".");
    setSign(valueSign);
    setInteger(valueInt);
    setDecimal(`.${valueDec}`);
  }, [value]);

  useEffect(() => {
    if (submitted) {
      setSign("-");
      setInteger("0");
      setDecimal(".00");
      return;
    }
    const data = symbol + int + dec;
    sendData(id, data);
  }, [symbol, int, dec, submitted]);

  return (
    <div className="flex jusitify-between gap-4 ">
      <select
        name={id}
        id={id}
        className="border-none focus:outline outline-primary-300  rounded-xl h-full p-2  bg-white dark:bg-darkGray w-full text-center"
        value={symbol}
        onChange={(e) => setSign(e.target.value)}
      >
        {sign.map((symbol, _) => {
          return (
            <option key={_} value={symbol}>
              {symbol}
            </option>
          );
        })}
      </select>
      <select
        className="text-center border-none scrollbar-custom focus:outline outline-primary-300  rounded-xl h-full p-2 bg-white dark:bg-darkGray w-full"
        value={int}
        onChange={(e) => setInteger(e.target.value)}
      >
        {integer.map((inte, _) => {
          return (
            <option key={_} value={inte}>
              {inte}
            </option>
          );
        })}
      </select>
      <select
        className="text-center border-none focus:outline outline-primary-300  rounded-xl h-full  p-2  bg-white dark:bg-darkGray w-full"
        value={dec}
        onChange={(e) => setDecimal(e.target.value)}
      >
        {decimal.map((dec, _) => {
          return (
            <option key={_} value={dec}>
              {dec}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SightInput;
