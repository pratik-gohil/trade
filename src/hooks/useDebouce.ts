import { useEffect, useState } from "react";

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  console.log("usedebounce");

  useEffect(() => {
    const handler = setTimeout(
      () => {
        setDebouncedValue(value);
      },
      value === "" ? 0 : delay
    );

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
