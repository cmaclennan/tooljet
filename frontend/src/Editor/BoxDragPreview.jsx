import React, { useEffect, useState, memo } from 'react';

export const BoxDragPreview = memo(function BoxDragPreview({ item }) {
    
    const [tickTock, setTickTock] = useState(false);

    useEffect(function subscribeToIntervalTick() {
        const interval = setInterval(() => setTickTock(!tickTock), 500);
        return () => clearInterval(interval);
    }, [tickTock]);

    let { width, height } = item;

    if(item.id === undefined) {
        width = item.component.defaultSize.width;
        height = item.component.defaultSize.height;
    }

    return (
        <div style={{ background: '#438fd7', opacity: '0.7', height, width }}>
		</div>
    );
});
