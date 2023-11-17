"use client";

import { ReactNode, useMemo, useState } from "react";
import { Dropdown, DropdownItem } from "../shared/Dropdown";
import { GdpData } from "@/types";

export type GdpInfoProps = { gdpData: GdpData[] };
export type GdpDataDropdown = GdpData & DropdownItem;

export function GdpInfo({ gdpData }: GdpInfoProps): ReactNode {
  const [selecteditem, setSelectedItem] = useState<GdpDataDropdown | undefined>(
    undefined
  );

  const dropdownOptions: GdpDataDropdown[] = useMemo(
    () =>
      gdpData.map<GdpDataDropdown>((item) => ({
        displayName: item.countryName,
        iconUrl: item.flagUrl,
        value: item.countryName,
        ...item,
      })),
    [gdpData]
  );

  return (
    <div className="flex flex-row flex-wrap gap-[100px] justify-center items-center">
      <Dropdown
        options={dropdownOptions}
        onItemSelect={setSelectedItem}
        selectedItem={selecteditem}
        width="300px"
      />
      <div className="w-[300px]">
        {selecteditem && `GDP: ${selecteditem.gdpAmountUsd} $`}
      </div>
    </div>
  );
}
