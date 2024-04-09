export class ProductURL {
  static readonly GET_PRODUCTS = "/products";
  static readonly GET_PRODUCTS_BY = "/products/";
  static readonly SAVE_PRODUCT = "/products";
  static readonly UPDATE_PRODUCT = "/products/";
  static readonly DELETE_PRODUCT = "/products/";
}

export class ManufacturerURL{
  static readonly GET_MANUFACTURERS = "/manufacturers";
  static readonly GET_MANUFACTURERS_PRODUCTS = "/manufacturers/products";
}

export class StatisticURL {
  static readonly GET_PRODUCTS_ORDER_BY = '/products';
  static readonly GET_PRODUCTS_BY_PRICE = "/products/price/least-five";
}

export class AuthenticationURL {
  static readonly REGISTER = "/register";
  static readonly AUTHENTICATE = "/authenticate";
  static readonly LOGIN = "/login";
  static readonly LOGOUT = "/logout";
}
