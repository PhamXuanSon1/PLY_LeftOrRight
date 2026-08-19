mergeInto(LibraryManager.library, {

    ALTrackEvent: function (eventNamePtr) {
        var eventName = UTF8ToString(eventNamePtr);

        // Always log so QA can filter console by "ALPlayableEvent"
        console.log('[ALPlayableEvent] ' + eventName);

        if (typeof window.ALPlayableAnalytics !== 'undefined') {
            window.ALPlayableAnalytics.trackEvent(eventName);
        }
    }

});
