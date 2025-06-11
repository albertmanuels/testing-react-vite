import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useOrderDetails(){
  const contextValues = useContext(OrderDetails)

  if(!contextValues) {
    throw new Error("useOrderDetails must be called from within an OrderDetailsProvider")
  }

  return contextValues
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {},
    toppings: {}
  })

  function updateItemCount(itemName, newItemCount, optionType) {
    const newOptionCounts = {...optionCounts}

    newOptionCounts[optionType][itemName] = newItemCount

    setOptionCounts(newOptionCounts)
  }

  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {}})
  }

  function calculateTotal(optionType) {
    const countsArray = Object.values(optionCounts[optionType])

    const totalCount = countsArray.reduce((total, value) => total + value, 0) 

    return totalCount * pricePerItem[optionType]
  }

  const totals =  {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings")
  }

  const value = {optionCounts, updateItemCount, resetOrder, totals}

  return (
    <OrderDetails.Provider value={value} {...props}/>
  )
}

