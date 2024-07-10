import { CarProps, FilterProps } from "@/types";



export async function fetchCars(filters: FilterProps) {
    const { manufacturer, year, model, limit, fuel } = filters;
  
    const headers = {
      'X-Api-Key': 'jZ0FfTUdKtAG3uVmI+3wAA==4DI9jthK9V9MWG7V',
      'Content-Type': 'application/json',
    };
  
    console.log(filters, 'filters');
  
    // Construct the query string using URLSearchParams
    const searchParams = new URLSearchParams();
  
    if (manufacturer) searchParams.append('make', manufacturer);
    if (year) searchParams.append('year', year.toString());
    if (model) searchParams.append('model', model);
    if (limit) searchParams.append('limit', limit.toString());
    if (fuel) searchParams.append('fuel_type', fuel);
  
    const url = `https://api.api-ninjas.com/v1/cars?${searchParams.toString()}`;
  
    console.log(url, 'url');
  
    try {
      const response = await fetch(url, { headers });
  
      // Check if the response is ok
      if (!response.ok) {
        console.error('API request failed with status:', response.status);
        return [];
      }
  
      const result = await response.json();
  
      // Log the result to see what is being returned
      console.log(result, 'result');
  
      return result;
    } catch (error) {
      console.error('Error fetching cars:', error);
      return [];
    }
  }
  



export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  };


  export const updateSearchParams = (type: string, value: string) => {
    // Get the current URL search params
    const searchParams = new URLSearchParams('');
  
    // Set the specified search parameter to the given value
    searchParams.set(type, value);
  
    // Set the specified search parameter to the given value
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  
    return newPathname;
  };
  
  export const deleteSearchParams = (type: string) => {
    // Set the specified search parameter to the given value
    const newSearchParams = new URLSearchParams(window.location.search);
  
    // Delete the specified search parameter
    newSearchParams.delete(type.toLocaleLowerCase());
  
    // Construct the updated URL pathname with the deleted search parameter
    const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`;
  
    return newPathname;
  };

  export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL("https://cdn.imagin.studio/getimage");
    const { make, model, year } = car;
  
    url.searchParams.append('customer', 'hrjavascript-mastery' );
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(" ")[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    // url.searchParams.append('zoomLevel', zoomLevel);
    url.searchParams.append('angle', `${angle}`);
  
    return `${url}`;
  } 

  //daefd14b-9f2b-4968-9e4d-9d4bb4af01d1