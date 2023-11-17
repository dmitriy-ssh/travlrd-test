"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

export type DropdownItem = {
  iconUrl: string;
  displayName: string;
  value: string;
};

export type DropdownProps<T extends DropdownItem> = {
  onItemSelect: (item: T) => void;
  selectedItem?: T;
  options: T[];
  width: string;
};

function renderDropdownItemFragment({ iconUrl, displayName }: DropdownItem) {
  return (
    <>
      <Image alt={`${displayName} flag`} src={iconUrl} width={23} height={12} />
      <p>{displayName}</p>
    </>
  );
}

const PLACEHOLDER_TEXT = "Select a country";

export function Dropdown<T extends DropdownItem>({
  onItemSelect,
  options,
  selectedItem,
  width,
}: DropdownProps<T>): JSX.Element {
  const isItemSelected = Boolean(selectedItem);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toogleOverlay = () => setIsOpen((open) => !open);

  useOnClickOutside(dropdownRef, () => isOpen && toogleOverlay());

  const panelJsx = useMemo(
    () => (
      <div
        id="dropdown-panel"
        className="absolute top-[42px] select-none"
        style={{ width }}
      >
        <ul className="w-100 [&>*:not(:first-child)]:-mt-0.5 max-h-[212px] overflow-y-scroll">
          {options.map((option) => (
            <li
              key={option.value}
              className="border-2 h-[44px] border-black rounded p-2 flex flex-row justify-start items-center gap-2"
              onClick={() => {
                onItemSelect(option);
                toogleOverlay();
              }}
              role="option"
              aria-selected={option.value === selectedItem?.value}
            >
              {renderDropdownItemFragment(option)}
            </li>
          ))}
        </ul>
      </div>
    ),
    [width, options, selectedItem?.value, onItemSelect]
  );

  const iconJsx = useMemo(
    () => (
      <Image
        alt="dropdown arrow"
        className={`ml-auto transition-transform ${isOpen && "rotate-180"}`}
        src="/arrow.png"
        width={24}
        height={24}
      />
    ),
    [isOpen]
  );

  const headerJsx = useMemo(
    () => (
      <div
        className="border-2 h-[44px] border-black rounded p-2 flex flex-row justify-start items-center gap-2"
        onClick={toogleOverlay}
      >
        {!isItemSelected && (
          <>
            <p>{PLACEHOLDER_TEXT}</p> {iconJsx}
          </>
        )}

        {selectedItem && (
          <>
            {renderDropdownItemFragment(selectedItem)} {iconJsx}
          </>
        )}
      </div>
    ),
    [iconJsx, isItemSelected, selectedItem]
  );

  return (
    <div
      role="combobox"
      aria-expanded={isOpen}
      aria-controls="dropdown-panel"
      className="select-none relative"
      style={{ width }}
      ref={dropdownRef}
    >
      <input type="hidden" value={selectedItem?.value || ""} />
      {headerJsx}
      {isOpen && panelJsx}
    </div>
  );
}
