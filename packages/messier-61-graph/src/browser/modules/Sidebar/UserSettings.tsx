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
import React from 'react'
import { connect } from 'react-redux'

import { toKeyString } from 'neo4j-arc/common'

import {
  StyledSetting,
  StyledSettingLabel,
  StyledSettingTextInput
} from './styled'
import { CheckboxSelector, RadioSelector } from 'browser-components/Form'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerSection,
  DrawerSectionBody,
  DrawerSubHeader
} from 'browser-components/drawer/drawer-styled'
import FeatureToggle from 'browser/modules/FeatureToggle/FeatureToggle'
import { GlobalState } from 'shared/globalState'
import {
  disableExperimentalFeature,
  enableExperimentalFeature,
  experimentalFeatureSelfName,
  getExperimentalFeatures
} from 'shared/modules/experimentalFeatures/experimentalFeaturesDuck'
import * as actions from 'shared/modules/settings/settingsDuck'
import {
  TelemetrySettingSource,
  TelemetrySettings,
  getTelemetrySettings
} from 'shared/utils/selectors'

const visualSettings = [
  {
    title: 'User Interface',
    settings: [
      {
        theme: {
          tooltip:
            'Use "Auto" to have neo4j-browser detect system dark vs. light mode if available.',
          displayName: 'Theme',
          type: 'radio',
          options: [
            actions.AUTO_THEME,
            actions.LIGHT_THEME,
            actions.OUTLINE_THEME,
            actions.DARK_THEME
          ]
        }
      },
      {
        codeFontLigatures: {
          displayName: 'Code font ligatures',
          tooltip: 'Use font ligatures for the command bar and cypher snippets',
          type: 'checkbox'
        }
      },
      {
        enableMultiStatementMode: {
          displayName: 'Enable multi statement query editor',
          tooltip: 'Allows query editor to execute multiple statements',
          type: 'checkbox'
        }
      }
    ]
  },
  {
    title: 'Preferences',
    settings: [
      {
        initCmd: {
          displayName: 'Initial command to execute',
          tooltip: 'This commands is executed once connected to a graph.',
          type: 'input'
        }
      },
      {
        connectionTimeout: {
          displayName: 'Connection timeout (ms)',
          tooltip:
            'The timeout in milliseconds when establishing a connection to Neo4j.',
          type: 'input'
        }
      }
    ]
  },
  {
    title: 'Result Frames',
    settings: [
      {
        maxFrames: {
          displayName: 'Maximum number of result frames',
          tooltip:
            'Max number of result frames. When reached, old frames gets retired.'
        }
      },
      {
        maxHistory: {
          displayName: 'Max history length',
          tooltip:
            'Max number of history entries. When reached, old entries gets retired.'
        }
      },
      {
        scrollToTop: {
          displayName: 'Scroll to top when adding frames',
          tooltip: 'Automatically scroll stream to top on new frames.',
          type: 'checkbox'
        }
      }
    ]
  },
  {
    title: 'Graph Visualization',
    settings: [
      {
        initialNodeDisplay: {
          displayName: 'Initial Node Display',
          tooltip:
            'Limit number of nodes displayed on first load of the graph visualization.'
        }
      },
      {
        maxNeighbours: {
          displayName: 'Max neighbours from vis interaction',
          tooltip: 'Limit exploratory queries to this limit.'
        }
      },
      {
        maxRows: {
          displayName: 'Result view max rows',
          tooltip: "Max number of rows to render in 'Rows' result view"
        }
      },
      {
        maxFieldItems: {
          displayName: 'Max record fields',
          tooltip: 'Limits the number of fields per returned record'
        }
      },
      {
        autoComplete: {
          displayName: 'Connect result nodes',
          tooltip:
            'If this is checked, after a cypher query result is retrieved, a second query is executed to fetch relationships between result nodes.',
          type: 'checkbox'
        }
      },
      {
        showWheelZoomInfo: {
          displayName: 'Show zoom interactions hint',
          tooltip: 'Pop-up info block with scroll interactions keybindings.',
          type: 'checkbox'
        }
      }
    ]
  }
]

function getTelemetryVisualSetting({
  telemetrySettings,
  trackOptOutCrashReports,
  trackOptOutUserStats
}: {
  telemetrySettings: TelemetrySettings
  trackOptOutCrashReports: (optedIn: boolean) => void
  trackOptOutUserStats: (optedIn: boolean) => void
}) {
  const settingsByFactor: Record<TelemetrySettingSource, any> = {
    SETTINGS_NOT_LOADED: [
      {
        allowUserStats: {
          displayName: 'Product usage',
          tooltip:
            'Product usage analytics is disabled before database connection is fully established.',
          type: 'info'
        }
      }
    ],
    DESKTOP_SETTING: [
      {
        allowUserStats: {
          displayName: 'Product Analytics',
          tooltip: `Product usage statistics are ${
            telemetrySettings.allowUserStats ? 'sent' : 'not sent'
          } and crash reports are ${
            telemetrySettings.allowCrashReporting ? 'sent' : 'not sent'
          }. These settings can be changed in Desktop.`,
          type: 'info'
        }
      }
    ],
    NEO4J_CONF: [
      {
        allowUserStats: {
          displayName: 'Product usage',
          tooltip: `Your database is ${
            telemetrySettings.allowUserStats ? '' : 'not '
          }configured to send product analytics data in neo4j.conf.`,
          type: 'info'
        }
      }
    ],
    AURA: [
      {
        allowUserStats: {
          displayName: 'Product usage',
          tooltip: `Aura Console has configured your database to ${
            telemetrySettings.allowUserStats ? '' : 'not '
          } send product analytics data.`,
          type: 'info'
        }
      }
    ],
    BROWSER_SETTING: [
      {
        allowCrashReports: {
          displayName: 'Send anonymous crash reports',
          tooltip:
            'Crash reports allow us to quickly diagnose and fix problems. No personal information is collected or sent.',
          type: 'checkbox',
          onChange: trackOptOutCrashReports
        }
      },
      {
        allowUserStats: {
          displayName: 'Send anonymous usage statistics',
          tooltip:
            'This data helps us prioritise features and improvements. No personal information is collected or sent.',
          type: 'checkbox',
          onChange: trackOptOutUserStats
        }
      }
    ]
  }

  const title = 'Product Analytics'
  const settings = settingsByFactor[telemetrySettings.source]
  return { title, settings }
}

export const UserSettings = ({
  settings,
  visualSettings,
  experimentalFeatures = {},
  onSettingsSave = () => {},
  onFeatureChange,
  telemetrySettings,
  trackOptOutCrashReports,
  trackOptOutUserStats
}: any) => {
  if (!settings) return null

  const mappedSettings = visualSettings
    .concat([
      getTelemetryVisualSetting({
        telemetrySettings,
        trackOptOutCrashReports,
        trackOptOutUserStats
      })
    ])
    .map((visualSetting: any) => {
      const title = <DrawerSubHeader>{visualSetting.title}</DrawerSubHeader>
      const mapSettings = visualSetting.settings
        .map((settingObj: any) => {
          const setting = Object.keys(settingObj)[0]
          if (typeof settings[setting] === 'undefined') return null
          const visual = settingObj[setting].displayName
          const tooltip = settingObj[setting].tooltip || ''
          const type = settingObj[setting].type || 'input'
          const onSettingChange = settingObj[setting].onChange

          if (type === 'input') {
            return (
              <StyledSetting key={toKeyString(visual)}>
                <StyledSettingLabel title={tooltip}>
                  {visual}
                  <StyledSettingTextInput
                    onChange={(event: any) => {
                      const newValue = event.target.value
                      settings[setting] = newValue
                      onSettingChange && onSettingChange(newValue)
                      onSettingsSave(settings)
                    }}
                    defaultValue={settings[setting]}
                    title={tooltip}
                    className={setting}
                    data-testid={`setting-${setting}`}
                  />
                </StyledSettingLabel>
              </StyledSetting>
            )
          }

          if (type === 'radio') {
            return (
              <StyledSetting key={toKeyString(visual)}>
                <StyledSettingLabel title={tooltip}>
                  {visual}
                </StyledSettingLabel>
                <RadioSelector
                  options={settingObj[setting].options}
                  onChange={(event: any) => {
                    const newValue = event.target.value
                    settings[setting] = newValue
                    onSettingChange && onSettingChange(newValue)
                    onSettingsSave(settings)
                  }}
                  selectedValue={settings[setting]}
                  data-testid={`setting-${setting}`}
                />
              </StyledSetting>
            )
          }

          if (type === 'checkbox') {
            return (
              <StyledSetting key={toKeyString(visual)}>
                <StyledSettingLabel title={tooltip}>
                  <CheckboxSelector
                    onChange={(event: any) => {
                      const newValue = event.target.checked
                      settings[setting] = newValue
                      onSettingChange && onSettingChange(newValue)
                      onSettingsSave(settings)
                    }}
                    checked={settings[setting]}
                    data-testid={`setting-${setting}`}
                  />
                  {visual}
                </StyledSettingLabel>
              </StyledSetting>
            )
          }

          if (type === 'info') {
            return (
              <StyledSetting key={toKeyString(visual)}>{tooltip}</StyledSetting>
            )
          }
          return null
        })
        .filter((setting: any) => setting !== null)

      return (
        <React.Fragment key={toKeyString(visualSetting.title)}>
          {title}
          {mapSettings}
        </React.Fragment>
      )
    })

  const mappedExperimentalFeatures = Object.keys(experimentalFeatures)
    .map(key => {
      const feature = experimentalFeatures[key]
      // Don't show the toggle to disable this section
      if (feature.name === experimentalFeatureSelfName) {
        return null
      }
      const visual = feature.displayName
      const tooltip = feature.tooltip || ''
      return (
        <StyledSetting key={toKeyString(feature.name)}>
          <StyledSettingLabel title={tooltip}>
            <CheckboxSelector
              onChange={(event: any) => {
                const on = event.target.checked
                onFeatureChange(feature.name, on)
              }}
              checked={experimentalFeatures[feature.name].on}
            />
            {visual}
          </StyledSettingLabel>
        </StyledSetting>
      )
    })
    .filter(r => r)

  return (
    <Drawer id="db-settings">
      <DrawerHeader>Browser Settings</DrawerHeader>
      <DrawerBody>
        <DrawerSection>
          <DrawerSectionBody key="settings">{mappedSettings}</DrawerSectionBody>
          <FeatureToggle
            name={experimentalFeatureSelfName}
            on={
              <>
                {mappedExperimentalFeatures.length ? (
                  <DrawerSubHeader>Experimental features</DrawerSubHeader>
                ) : null}
                <DrawerSectionBody key="experimental-features">
                  {mappedExperimentalFeatures}
                </DrawerSectionBody>
              </>
            }
          />
        </DrawerSection>
      </DrawerBody>
    </Drawer>
  )
}

const mapStateToProps = (state: GlobalState) => {
  return {
    experimentalFeatures: getExperimentalFeatures(state),
    settings: state.settings,
    visualSettings,
    telemetrySettings: getTelemetrySettings(state)
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSettingsSave: (settings: Partial<actions.SettingsState>) => {
      dispatch(actions.update(settings))
    },
    trackOptOutCrashReports(optedIn: boolean) {
      if (!optedIn) {
        dispatch({ type: actions.TRACK_OPT_OUT_CRASH_REPORTS })
      }
    },
    trackOptOutUserStats: (optedIn: boolean) => {
      if (!optedIn) {
        dispatch({ type: actions.TRACK_OPT_OUT_USER_STATS })
      }
    },
    onFeatureChange: (name: any, on: any) => {
      if (on) {
        dispatch(enableExperimentalFeature(name))
      } else {
        dispatch(disableExperimentalFeature(name))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings)
