## The App is a very simple demonstration of state following in an iFrame
 
### Key requirements:
 * do not show the parameters used within the iFrame in the main navigation bar
 * ensure bookmarking preserves the same view in the iFrame that existed when bookmarked
 
### Solution:
 An iframe directive tracks clicks on anchor tags within the iFrame. The hash of each link is recorded in localStorage.
 Upon returning to the page, the directive sets the href property by including the hash from localStorage. This simple
 technique satisfies both requirements.
 
 ### Query parmeters question
 What about query parameters. Use the same technique: 1. store the query string in localStorage; 2. Allow the iframe
 directive to reconstruct the URL with the query string attached.
 