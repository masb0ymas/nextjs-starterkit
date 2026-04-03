import { queryOptions } from '@tanstack/react-query'

import { servers } from '../servers'

const getOSMByAddress = (address: string) =>
  queryOptions({
    queryKey: ['osm-by-address', address],
    queryFn: () => servers.osm.byAddress(address),
  })

export const osmQueries = {
  byAddress: getOSMByAddress,
} as const
