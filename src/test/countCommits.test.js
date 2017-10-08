import counterCommit from '../../countCommit';

test("Count commit should be return something", () => {
    let commitUrl = "https://api.github.com/repos/mundipagg/magento/commits";
    counterCommit
    .then(data => {
        expect(data).toBeTruthy();
    })
})