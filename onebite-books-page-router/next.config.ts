import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true, // true : React 앱의 잠재적인 문제를 감지하고 경고를 표시 -> 2번 리랜더링
  swcMinify: true, // true : SWC를 사용하여 코드 압축 -> 빌드 속도 향상
};

export default nextConfig;
