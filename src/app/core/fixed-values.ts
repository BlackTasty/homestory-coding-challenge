import { Country } from "./model/country";

// Contains static variables
export class FixedValues {
  public static countries: Country[] = [
    new Country("Austria", "AT"),
    new Country("Germany", "DE"),
    new Country("Spain", "ES")
  ];
}
