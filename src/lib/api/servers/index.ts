'use server'

import { osmServers } from './osm'

export const servers = {
  osm: osmServers,
} as const
