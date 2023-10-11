/*
 * Copyright Jiaqi Liu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export function listUsersQuery(is40 = false) {
  if (is40) {
    return 'SHOW USERS'
  }

  return 'CALL dbms.security.listUsers'
}

export function listRolesQuery(is40 = false) {
  if (is40) {
    return 'SHOW ALL ROLES'
  }

  return 'CALL dbms.security.listRoles'
}
export function createDatabaseUser(
  { username, forcePasswordChange }: any,
  is40 = false
) {
  if (is40) {
    return `CREATE USER \`${username}\` SET PASSWORD $password CHANGE ${
      forcePasswordChange ? '' : 'NOT'
    } REQUIRED`
  }

  return `CALL dbms.security.createUser($username, $password, ${!!forcePasswordChange})`
}
export function deleteUser(username: any, is40 = false) {
  if (is40) {
    return `DROP USER \`${username}\``
  }

  return 'CALL dbms.security.deleteUser($username)'
}
export function addRoleToUser(username: any, role: any, is40 = false) {
  if (is40) {
    return `GRANT ROLE \`${role}\` TO \`${username}\``
  }

  return 'CALL dbms.security.addRoleToUser($role, $username)'
}
export function removeRoleFromUser(role: any, username: any, is40 = false) {
  if (is40) {
    return `REVOKE ROLE \`${role}\` FROM \`${username}\``
  }

  return 'CALL dbms.security.removeRoleFromUser($role, $username)'
}
export function activateUser(username: any, is40 = false) {
  if (is40) {
    return `ALTER USER \`${username}\` SET STATUS ACTIVE`
  }

  return 'CALL dbms.security.activateUser($username, false)'
}
export function suspendUser(username: any, is40 = false) {
  if (is40) {
    return `ALTER USER \`${username}\` SET STATUS SUSPENDED`
  }

  return 'CALL dbms.security.suspendUser($username)'
}
