# PharmacyFront Angular App

### 📌 Dependencies: <br>
      Angular Material, <br>
      chart.js & ng2-charts, <br>
      rxjs <br>

### 🌐 Back-End Module:
      https://github.com/zaricu22/PharmacyBack

### 📷 GitHub Pages:
      [Pharmacy GitHub Pages](https://zaricu22.github.io/PharmacyFront)  
      (Notice: first API access can delay ~2min because of Render Cloud Free Plan!)

## 🗂️ Folder Structure
~~~
├── app
│   ├── app-routing.module.ts
│   ├── app.component.css
│   ├── app.component.html
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.module.ts
│   ├── core
│   │   ├── auth
│   │   │   ├── components
│   │   │   │   ├── login
│   │   │   │   │   ├── login.component.css
│   │   │   │   │   ├── login.component.html
│   │   │   │   │   ├── login.component.spec.ts
│   │   │   │   │   └── login.component.ts
│   │   │   │   └── register
│   │   │   │       ├── register.component.css
│   │   │   │       ├── register.component.html
│   │   │   │       ├── register.component.spec.ts
│   │   │   │       └── register.component.ts
│   │   │   ├── guards
│   │   │   │   ├── auth.guard.spec.ts
│   │   │   │   └── auth.guard.ts
│   │   │   ├── interceptors
│   │   │   │   ├── token.interceptor.spec.ts
│   │   │   │   └── token.interceptor.ts
│   │   │   ├── models
│   │   │   │   ├── authentication-request.ts
│   │   │   │   ├── authentication-response.ts
│   │   │   │   └── register-request.ts
│   │   │   └── services
│   │   │       ├── authentication.service.spec.ts
│   │   │       └── authentication.service.ts
│   │   ├── components
│   │   │   ├── about
│   │   │   │   ├── about-view.component.css
│   │   │   │   ├── about-view.component.html
│   │   │   │   ├── about-view.component.spec.ts
│   │   │   │   └── about-view.component.ts
│   │   │   ├── footer
│   │   │   │   ├── footer.component.css
│   │   │   │   ├── footer.component.html
│   │   │   │   ├── footer.component.spec.ts
│   │   │   │   └── footer.component.ts
│   │   │   ├── header
│   │   │   │   ├── header.component.css
│   │   │   │   ├── header.component.html
│   │   │   │   ├── header.component.spec.ts
│   │   │   │   └── header.component.ts
│   │   │   └── sidenav
│   │   │       ├── sidenav.component.css
│   │   │       ├── sidenav.component.html
│   │   │       ├── sidenav.component.spec.ts
│   │   │       └── sidenav.component.ts
│   │   ├── constants
│   │   │   ├── api-url.spec.ts
│   │   │   └── api-url.ts
│   │   ├── core.module.ts
│   │   ├── dto
│   │   │   └── product-number-dto.ts
│   │   ├── guards
│   │   ├── interceptors
│   │   ├── models
│   │   │   ├── imanufacturer.ts
│   │   │   └── iproduct.ts
│   │   └── services
│   │       ├── manufacturer.service.spec.ts
│   │       └── manufacturer.service.ts
│   ├── features
│   │   ├── product
│   │   │   ├── components
│   │   │   │   ├── product-create
│   │   │   │   │   ├── product-create.component.css
│   │   │   │   │   ├── product-create.component.html
│   │   │   │   │   ├── product-create.component.spec.ts
│   │   │   │   │   └── product-create.component.ts
│   │   │   │   ├── product-edit
│   │   │   │   │   ├── product-edit.component.css
│   │   │   │   │   ├── product-edit.component.html
│   │   │   │   │   ├── product-edit.component.spec.ts
│   │   │   │   │   └── product-edit.component.ts
│   │   │   │   └── product-view
│   │   │   │       ├── product-view.component.css
│   │   │   │       ├── product-view.component.html
│   │   │   │       ├── product-view.component.spec.ts
│   │   │   │       └── product-view.component.ts
│   │   │   ├── product-routing.module.ts
│   │   │   ├── product.module.ts
│   │   │   └── services
│   │   │       ├── product.service.spec.ts
│   │   │       └── product.service.ts
│   │   └── statistics
│   │       ├── components
│   │       │   └── statistics
│   │       │       ├── statistics.component.css
│   │       │       ├── statistics.component.html
│   │       │       ├── statistics.component.spec.ts
│   │       │       └── statistics.component.ts
│   │       ├── services
│   │       │   ├── statistic.service.spec.ts
│   │       │   └── statistic.service.ts
│   │       ├── statistics-routing.module.ts
│   │       └── statistics.module.ts
│   └── shared
│       ├── components
│       │   └── product-dialog
│       │       ├── product-dialog.component.css
│       │       ├── product-dialog.component.html
│       │       ├── product-dialog.component.spec.ts
│       │       └── product-dialog.component.ts
│       ├── configs
│       ├── directives
│       ├── pipes
│       └── shared.module.ts
├── assets
├── environments
│   ├── environment.development.ts
│   ├── environment.prod.ts
│   └── environment.ts
├── favicon.ico
├── index.html
├── main.ts
└── styles.css
~~~
