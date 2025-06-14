import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    RouterProvider
} from 'react-router-dom'
import { SUBSCRIPTION_TEMPLATE_TYPE } from '@localzet/aura-contract'

import { SubscriptionPageBuilderConnector } from '@pages/dashboard/utils/subscription-page-builder/ui/connectors/subscription-page-builder.page.connector'
import { HappRoutingBuilderPageConnector } from '@pages/dashboard/utils/happ-routing-builder/ui/connectors/happ-routing-builder.page.connector'
import { TemplateBasePageConnector } from '@pages/dashboard/templates/ui/connectors/template-base-page.connector'
import { NodesBandwidthTablePageConnector } from '@pages/dashboard/nodes-bandwidth-table/ui/connectors'
import { SubscriptionSettingsConnector } from '@pages/dashboard/subscription-settings/connectors'
import { StatisticNodesConnector } from '@pages/dashboard/statistic-nodes/connectors'
import { ApiTokensPageConnector } from '@pages/dashboard/api-tokens/ui/connectors'
import { InboundsPageConnector } from '@pages/dashboard/inbounds/ui/connectors'
import { ConfigPageConnector } from '@pages/dashboard/config/ui/connectors'
import { HostsPageConnector } from '@pages/dashboard/hosts/ui/connectors'
import { UsersPageConnector } from '@pages/dashboard/users/ui/connectors'
import { NodesPageConnector } from '@pages/dashboard/nodes/ui/connectors'
import { HomePageConnector } from '@pages/dashboard/home/connectors'
import { NotFoundPageComponent } from '@pages/errors/4xx-error'
import { ErrorBoundaryHoc } from '@shared/hocs/error-boundary'
import { ErrorPageComponent } from '@pages/errors/5xx-error'
import { AuthGuard } from '@shared/hocs/guards/auth-guard'
import { LoginPage } from '@pages/auth/login'

import { MainLayout } from '../layouts/dashboard/main-layout/main.layout'
import { ROUTES } from '../../shared/constants'
import { AuthLayout } from '../layouts/auth'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<ErrorBoundaryHoc fallback={<ErrorPageComponent />} />}>
            <Route element={<AuthGuard />}>
                <Route element={<Navigate replace to={ROUTES.DASHBOARD.ROOT} />} path="/" />
                <Route element={<AuthLayout />} path={ROUTES.AUTH.ROOT}>
                    <Route element={<Navigate replace to={ROUTES.AUTH.LOGIN} />} index />
                    <Route element={<LoginPage />} path={ROUTES.AUTH.LOGIN} />
                </Route>

                <Route element={<MainLayout />} path={ROUTES.DASHBOARD.ROOT}>
                    <Route element={<Navigate replace to={ROUTES.DASHBOARD.HOME} />} index />
                    <Route element={<HomePageConnector />} path={ROUTES.DASHBOARD.HOME} />

                    <Route path={ROUTES.DASHBOARD.MANAGEMENT.ROOT}>
                        <Route
                            element={<Navigate replace to={ROUTES.DASHBOARD.MANAGEMENT.USERS} />}
                            index
                        />
                        <Route
                            element={<UsersPageConnector />}
                            path={ROUTES.DASHBOARD.MANAGEMENT.USERS}
                        />
                        <Route
                            element={<InboundsPageConnector />}
                            path={ROUTES.DASHBOARD.MANAGEMENT.INBOUNDS}
                        />
                        <Route
                            element={<HostsPageConnector />}
                            path={ROUTES.DASHBOARD.MANAGEMENT.HOSTS}
                        />
                        <Route
                            element={<NodesPageConnector />}
                            path={ROUTES.DASHBOARD.MANAGEMENT.NODES}
                        />
                        <Route
                            element={<NodesBandwidthTablePageConnector />}
                            path={ROUTES.DASHBOARD.MANAGEMENT.NODES_BANDWIDTH_TABLE}
                        />
                        <Route
                            element={<StatisticNodesConnector />}
                            path={ROUTES.DASHBOARD.MANAGEMENT.NODES_STATS}
                        />
                        <Route
                            element={<ConfigPageConnector />}
                            path={ROUTES.DASHBOARD.MANAGEMENT.CONFIG}
                        />
                        <Route
                            element={<ApiTokensPageConnector />}
                            path={ROUTES.DASHBOARD.MANAGEMENT.API_TOKENS}
                        />
                        <Route
                            element={<SubscriptionSettingsConnector />}
                            path={ROUTES.DASHBOARD.MANAGEMENT.SUBSCRIPTION_SETTINGS}
                        />
                    </Route>

                    <Route path={ROUTES.DASHBOARD.TEMPLATES.ROOT}>
                        <Route
                            element={
                                <TemplateBasePageConnector
                                    language="yaml"
                                    templateType={SUBSCRIPTION_TEMPLATE_TYPE.MIHOMO}
                                    title="Mihomo"
                                />
                            }
                            path={ROUTES.DASHBOARD.TEMPLATES.MIHOMO}
                        />
                        <Route
                            element={
                                <TemplateBasePageConnector
                                    language="yaml"
                                    templateType={SUBSCRIPTION_TEMPLATE_TYPE.STASH}
                                    title="Stash"
                                />
                            }
                            path={ROUTES.DASHBOARD.TEMPLATES.STASH}
                        />
                        <Route
                            element={
                                <TemplateBasePageConnector
                                    language="json"
                                    templateType={SUBSCRIPTION_TEMPLATE_TYPE.SINGBOX}
                                    title="Singbox"
                                />
                            }
                            path={ROUTES.DASHBOARD.TEMPLATES.SINGBOX}
                        />
                        <Route
                            element={
                                <TemplateBasePageConnector
                                    language="json"
                                    templateType={SUBSCRIPTION_TEMPLATE_TYPE.SINGBOX_LEGACY}
                                    title="Singbox legacy"
                                />
                            }
                            path={ROUTES.DASHBOARD.TEMPLATES.SINGBOX_LEGACY}
                        />
                        <Route
                            element={
                                <TemplateBasePageConnector
                                    language="json"
                                    templateType={SUBSCRIPTION_TEMPLATE_TYPE.XRAY_JSON}
                                    title="Xray JSON"
                                />
                            }
                            path={ROUTES.DASHBOARD.TEMPLATES.XRAY_JSON}
                        />
                        <Route
                            element={
                                <TemplateBasePageConnector
                                    language="yaml"
                                    templateType={SUBSCRIPTION_TEMPLATE_TYPE.CLASH}
                                    title="Clash"
                                />
                            }
                            path={ROUTES.DASHBOARD.TEMPLATES.CLASH}
                        />
                    </Route>

                    <Route path={ROUTES.DASHBOARD.UTILS.ROOT}>
                        <Route
                            element={
                                <Navigate
                                    replace
                                    to={ROUTES.DASHBOARD.UTILS.HAPP_ROUTING_BUILDER}
                                />
                            }
                            index
                        />
                        <Route
                            element={<HappRoutingBuilderPageConnector />}
                            path={ROUTES.DASHBOARD.UTILS.HAPP_ROUTING_BUILDER}
                        />
                        <Route
                            element={<SubscriptionPageBuilderConnector />}
                            path={ROUTES.DASHBOARD.UTILS.SUBSCRIPTION_PAGE_BUILDER}
                        />
                    </Route>
                </Route>

                <Route element={<NotFoundPageComponent />} path="*" />
            </Route>
        </Route>
    )
)

export function Router() {
    return <RouterProvider router={router} />
}
