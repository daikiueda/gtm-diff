const GOOGLE_LIB_NAME = 'tagmanager',
    GOOGLE_LIB_VERSION = 'v1';

import Q from 'q';

export default class GoogleTagManagerAPI {
    constructor(googleCoreAPI) {
        this.api = null;
        this.googleCoreAPI = googleCoreAPI;
    }

    init() {
        return Q.promise((resolve, reject) => {
            this.googleCoreAPI.gapi.client.load(GOOGLE_LIB_NAME, GOOGLE_LIB_VERSION)
                .then(() => {
                    this.api = this.googleCoreAPI.gapi.client.tagmanager;
                    resolve(this);
                });
        });
    }

    fetchAccountsAndContainers() {
        var accountsAndContainers = [],
            requestAccountsList = this.api.accounts.list();

        return Q.promise((resolve, reject) => {
            requestAccountsList.execute(response => {
                if (!response.accounts || !response.accounts.length) {
                    reject(accountsAndContainers);
                    return;
                }

                Q.all(response.accounts.map(account => {
                    return this.fetchContainersByAccount(account)
                        .then(containers => {
                            account.containers = containers;
                            accountsAndContainers.push(account);
                        });
                }))
                    .then(() => {
                        resolve(accountsAndContainers);
                    });
            });
        });
    }

    fetchContainersByAccount(account) {
        var {accountId, name} = account,
            requestContainersList = this.api.accounts.containers.list({accountId});

        return Q.promise((resolve, reject) => {
            requestContainersList.execute(response => {
                resolve(response.containers.map(container => {
                    // それぞれのコンテナに、アカウント名を付与する
                    container.accountName = name;
                    return container;
                }));
            });
        });
    }

    fetchContainerVersions(container) {
        var {accountId, containerId} = container,
            requestContainerVersions = this.api.accounts.containers.versions.list({accountId, containerId}),
            requestContainerCurrentTags = this.api.accounts.containers.tags.list({accountId, containerId}),
            requestContainerCurrentTriggers = this.api.accounts.containers.triggers.list({accountId, containerId}),
            requestContainerCurrentVariable = this.api.accounts.containers.variables.list({accountId, containerId});

        return Q.allSettled([
            Q.promise((resolve, reject) => {
                requestContainerVersions.execute(response => {resolve(response.containerVersion);});
            }),
            Q.promise((resolve, reject) => {
                requestContainerCurrentTags.execute(response => {resolve(response.tags);});
            }),
            Q.promise((resolve, reject) => {
                requestContainerCurrentTriggers.execute(response => {resolve(response.triggers);});
            }),
            Q.promise((resolve, reject) => {
                requestContainerCurrentVariable.execute(response => {resolve(response.variables);});
            })
        ])
            .then(function(results) {
                console.log(arguments);
                var versions = results[0].value;
                versions.push({
                    containerVersionId: 'Editing',
                    tag: results[1].value,
                    trigger: [],
                    variable: []
                });
                return versions;
            });
    }
}