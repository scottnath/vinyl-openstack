'use strict';

/**
 * Default pkgcloud configuratin for openstack
 * @type {Object}
 */
module.exports = {
  provider: 'openstack',
  useServiceCatalog: true,
  useInternal: false,
  keystoneAuthVersion: 'v3',
  authUrl: 'https://identity.open.softlayer.com',
  tenantId: '',    //projectId from credentials
  domainId: '',
  username: 'yourusername',
  password: 'yourpassword',
  container: 'yourcontainer',
  region: 'dallas'   //dallas or london region
};