// useNavigationEvent.tsx
"use client";

import { ReadonlyURLSearchParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

//
const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  // Ensure params are a string
  const paramsString = params.toString();

  // Check to see whether we need to append a "?" because params exist
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  // return combined string
  return `${pathname}${queryString}`;
};

//
const useNavigationEvent = (onPathnameChange: () => void) => {
  const pathname = usePathname(); // Get current route
  const searchParams = useSearchParams()!; // Get current search params

  // Save the full url into a ref
  const savedPathNameRef = useRef(createUrl(pathname, searchParams));

  useEffect(() => {
    // Generate fresh full url
    const newPathName = createUrl(pathname, searchParams);

    // Compare saved full url and regenerated url
    if (savedPathNameRef.current !== newPathName) {
      // Run passed in function
      onPathnameChange();
      // Update saved Ref
      savedPathNameRef.current = createUrl(pathname, searchParams);
    }
  }, [pathname, searchParams, onPathnameChange]);
};

export default useNavigationEvent;
