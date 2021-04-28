import { IStrategy } from '../../types'
import { DependencyData } from '../../dependency-data'

export const singletonStrategy = new (class implements IStrategy {
  execute<T>(dep: DependencyData<T>, resolvedDeps: unknown[]) {
    if (dep.cache) {
      return dep.cache as T
    }

    const cachedDep = new dep.dependency(...resolvedDeps) as T
    dep.cache = cachedDep

    return cachedDep as T
  }
})()
