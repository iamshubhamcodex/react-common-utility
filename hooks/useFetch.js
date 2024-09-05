import { useEffect, useRef, useState } from "react";
import { kindOf } from "../lib/utility";

 const useFetch = (cb, cleanup, dependency) => {
  const fetchedRef = useRef(false);
  const counter = useRef(0);
  const [ran, setRan] = useState(false);
  const dependencyRef = useRef(dependency);

  const dependencyArrayChecker = () => {
    if (dependency.length !== dependencyRef.current.length) return true;

    let changed = false;

    for (let i = 0; i < dependency.length; i++) {
      if (dependency[i] !== dependencyRef.current[i]) {
        changed = true;
        break;
      }
    }
    return changed;
  };

  useEffect(() => {
    if (!dependency) {
      if (!fetchedRef.current && !ran && counter.current < 6) {
        counter.current += 1;
        fetchedRef.current = true;
        setRan(true);
        kindOf(cb, "function") && cb();
      }
    }
    return () => {
      kindOf(cleanup, "function") && cleanup();
    };
  }, []);

  useEffect(() => {
    if (dependency) {
      if (dependencyArrayChecker()) {
        dependency[0] && cb();
        dependencyRef.current = dependency;
        return () => {
          kindOf(cleanup, "function") && cleanup();
        };
      }
    }
  }, dependency);
};

export default useFetch