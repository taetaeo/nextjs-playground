# 페이지 라우터 시작하기

## 1. Next.js 앱 생성하기

## 2. 생성한 Next.js 앱 살펴보기

### 2.2. next.config.ts

> 이 파일은 프로젝트 루트(`/`)에 있는 `next.config.ts` 입니다. 이름에서도 알 수 있듯, 이 파일은 Next.js 앱의 설정을 담당합니다.

이 파일을 통해서 next.js의 세부적인 옵션 설정을 할 수 있습니다.

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true, // true : React 앱의 잠재적인 문제를 감지하고 경고를 표시 -> 2번 리랜더링
  swcMinify: true, // true : SWC를 사용하여 코드 압축 -> 빌드 속도 향상
};

export default nextConfig;
```

### 2.3. tsconfig.json, next-env-d.ts

**2.3.1. tsconfig.json**

> 타입스크립트 컴파일러의 옵션 설정 파일입니다. 이 파일로 타입 검사의 규칙이나 컴파일 옵션을 설정합니다.

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

**2.3.2. next-env.d.ts**

> Next.js 의 내장 타입(API 핸들러, 페이지 컴포넌트 등)을 사용할 수 있도록 설정하는 파일입니다.

이 파일은 Next.js의 다양한 기능을 타입으로 정의해 프로젝트에서 오류 없이 활용할 수 있도록 도와줍니다. 즉, Next.js 환경에 맞게 타입스크립트가 바르게 동작하도록 도와주는 파일이라 할 수 있다.

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/pages/api-reference/config/typescript for more information.
```

### 2.4. public 폴더

> public 폴더는 프로젝트에서 사용하는 정적 파일(이미지, 폰트, 동영상 등)을 보관하는 폴더입니다.

이 폴더의 파일들은 Next.js 앱을 **빌드할 때 변환되지 않고,** 그대로 클라이언트에 제공됩니다. 따라서, 브라우저에서 주소를 입력하면 이 폴더의 파일들에 직접 접근할 수 있습니다.

### 2.5. src 폴더

> src 는 Next.js 앱의 소스코드를 보관하는 공간입니다. src 폴더는 필수 구성 요고슨ㄴ 아니지만, 대체로 파일을 좀 더 체계적(계층적)으로 관리하기 위해 `src` 폴더를 사용합니다. 내부에는 대표적으노 `pages` 폴더와 `styles`폴더가 있습니다.

- `pages` 폴더 : 페이지 라우팅을 관리하는 폴더입니다. `pages` 폴더 구조에 따라 Next.js 앱의 라우팅이 자동으로 설정됩니다.
- `styles` 폴더 : 프로젝트 스타일을 위한 css 또는 sass(scss) 파일을 저장하는 폴더입니다.

### 2.6. ESLint 옵션 파일

> `ESLint`는 코드의 품질을 유지하고 코드에 존재하는 `잠재 오류`를 미리 발견하도록 도와주는 도구입니다.

오늘날에는 자바스크립트, 타입스크립트 개발에 있어 거의 필수 도구가 되었습니다. Next.js 앱을 생성하면 `eslint.config.mjs`라는 이름의 ESLint 설정 파일이 자동으로 생성됩니다. 이 파일을 열면 다음과 같이 Next.js 와 관련된 기본 코드 규칙들이 설정 되어 있습니다.

```mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn", // typeScript에서 사용되지 않는 변수를 경고로 표시
      "@typescript-eslint/no-explicit-any": "off", // 'any' 타입 사용을 허용
    },
  },
];

export default eslintConfig;
```

- `extends`는 이미 만들어 놓은 설정 규칙을 그대로 사용한다는 의미의 `확장` 즉, 상속 옵션입니다. 여기서 배열로 2개의 설정 규칙을 불러옵니다. `next/core-web-vitals`는 Next.js의 성능을 위해 권장되는 코드 작성과 관련된 설정 규칙입니다.
- `next/typescript`는 Next.js에서 타입스크립트를 안전하게 화룡ㅇ하기 위한 설정 규칙입니다.

## 3. Next.js 앱 실행하기

```json
{
(...)
  "scripts": {
    "dev": "next dev",        // 앱을 개발 모드로 실행하기
    "build": "next build",    // 앱을 빌드하기
    "start": "next start",    // 빌드한 앱을 실행하기
    "lint": "next lint"       // 코드 품질 검사하기
  },
(...)
}
```

### 3.1. 개발 모드로 실행하기

> Next.js 앱을 개발모드로 싱행할때, 다음의 명령어를 작성한다.

```bash
# 개발 모드 실행하기
$npm run dev
```

### 3.2. 프로덕션 모드로 실행하기

> 앱을 프로덕션 모드로 싱핼하려면 먼저, 앱을 `빌드(build)`기 이뤄져야한다. 빌드는 개발 모드에서 작성한 코드를 최적화하여 실제로 배포할 수 있는 형태로 변환하는 작업입니다.

_개발 모드와 프로덕션 모드의 차이점_

**(1) 개발 모드**

- 개발 모드는 말 그대로 서비스를 개발하는 과정에서 사용하는 모드이다. 이 모드에서는 갭라자가 코드를 수정할 때마다 즉각 결과를 확인하도록 여러 디버깅 도구를 제공하여 개발의 편의를 돕습니다.
- 예를 들어, 개발 모드에서는 `핫 리로딩(Hot Reloading)`이 활성화되므로 코드를 수정하면 자동으로 화면을 새로고침해 변경 사항을 바로 확인할 수 있습니다.
- 또한, 개발 모드에서는 성능보다는 개발 생산성을 우선으로 하기 때문에 코드 분석과 오류 확인이 용이하도록 상세한 로그와 경고 메시지등을 함께 제공합니다.

**(2) 프로덕션 모드**

- 프로덕션 모드는 개발을 완료한 앱을 실제 사용자에게 배포할 때 사용합니다. 이 모드에서는 개발 과정에서 필요했던 디버깅 기능은 비활성화되는 반명, 앱의 성능 최적화 전략이 중심이 됩니다.
- 따라서, 코드를 `최소화(minification)`하고 불필요했던 코드를 제거하는 `트리셰이킹(Tree-Shaking)`으로 파일의 크기를 줄이고 로드 속도를 향상시킵니다.
- 또한, 캐싱 전략을 사용해 앱이 빠르고 효율적으로 움직이도록 만듭니다.

```bash
# 빌드하기
$npm run build

# 프로덕션 모드 실행하기
$npm run start
```

## 4. 라우팅 설정하기

> \*참고. 웹에서 라우팅(Routing)이란 브라우저가 요청하는 URL 경로에 따라 적절한 페이지를 화면에 랜더링하기까지의 과정을 말합니다.

### 4.1. 불필요한 기본 CSS 제거 하기
