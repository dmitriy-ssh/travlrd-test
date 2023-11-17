import xpath from "xpath";
import { DOMParser } from "@xmldom/xmldom";
import { GdpData } from "@/types";

export function parseWikipediaGdpPage(html: string): GdpData[] {
  try {
    const document = new DOMParser().parseFromString(html);

    const rows = xpath.select(
      `//table[contains(caption, 'by country')]/tbody/tr[position() > 1]`,
      document
    );

    if (!Array.isArray(rows)) {
      throw new Error();
    }

    const result: GdpData[] = [];

    // Iterate through the selected rows and extract text data
    rows.forEach((row) => {
      const imageNode = xpath.select("td[1]//img/@src", row);
      /** @ts-ignore */
      const srcValue = imageNode?.[0]?.value;
      const imageUrl = srcValue ? "https:" + srcValue : "";

      const countryNameNode = xpath.select("td[1]//a/text()", row);

      /** @ts-ignore */
      const nameValue = countryNameNode?.[0]?.nodeValue;

      const gdpNode = xpath.select("td[3]/text()", row);

      /** @ts-ignore */
      const gdpValue = gdpNode?.[0]?.nodeValue;

      if (imageUrl && nameValue) {
        result.push({
          countryName: nameValue,
          flagUrl: imageUrl,
          gdpAmountUsd: gdpValue,
        });
      }
    });

    return result;
  } catch {
    throw new Error("Wikipedia parsing failed");
  }
}
