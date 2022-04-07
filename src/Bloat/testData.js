export const generateTestPosts = function (numPosts) {
    let testPosts = [];
    for (let i = 0; i < numPosts; i++) {
        testPosts.push({
            name: "Story " + i,
            author: {
                name: "Author " + i
            }
        });
        if(i%2){
            testPosts[i].series = "Series " + i
        }
    }
    return testPosts
}