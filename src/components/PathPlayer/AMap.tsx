import React, { useState, useEffect } from 'react';
import BasicAMap from '../../components/AMap/BasicAMap';
import { LngLat } from '../props';
import { injectChildren } from '../../utils';
import styles from './AMap.less';

export interface PathMapProps {
  panelWidth?: React.CSSProperties['width'];
  height: React.CSSProperties['height'];
}
export default function ({ panelWidth, height, children }: React.PropsWithChildren<PathMapProps>) {
  const [display, setDisplay] = useState(true);
  const [position, setPosition] = useState();
  const [amapIns, setAmapIns] = useState();

  useEffect(() => {
    console.log('unmount AMap');
    return () => {
      setDisplay(false);
      setAmapIns(null);
    }
  }, []);

  const initCallback = () => {
    console.log("AMapUI Loaded Done.")
  }

  const panelProps = !!panelWidth && {
    className: styles.panel,
    style: {
      width: panelWidth,
      height,
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ height, paddingRight: panelWidth }}>
        {display && (
          <BasicAMap
            onClick={(lnglat: LngLat) => setPosition({ lng: lnglat.lng, lat: lnglat.lat })}
            onCreated={(amap) => { setAmapIns(amap) }}
            zoom={4}
            center={position}
            useAMapUI={initCallback}
          />
        )}
      </div>
      <div {...panelProps}>
        {amapIns && injectChildren(children, { __map__: amapIns })}
      </div>
    </div>
  )
}
