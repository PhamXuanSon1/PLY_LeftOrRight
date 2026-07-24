mergeInto(LibraryManager.library, {
    
    // Track event với AppLovin Analytics
    AppLovinAnalytics_TrackEvent: function(eventNamePtr) {
        var eventName = UTF8ToString(eventNamePtr);
        
        // Safety check như document AppLovin yêu cầu
        if (typeof window.ALPlayableAnalytics != 'undefined') {
            try {
                window.ALPlayableAnalytics.trackEvent(eventName);
                console.log('[AppLovin Analytics] Event tracked: ' + eventName);
            } catch (e) {
                console.error('[AppLovin Analytics] Error tracking event: ' + eventName, e);
            }
        } else {
            console.warn('[AppLovin Analytics] ALPlayableAnalytics is not available. Event: ' + eventName);
        }
    },
    
    // Check xem AppLovin Analytics có available không
    AppLovinAnalytics_IsAvailable: function() {
        return (typeof window.ALPlayableAnalytics != 'undefined') ? 1 : 0;
    }
    
});
