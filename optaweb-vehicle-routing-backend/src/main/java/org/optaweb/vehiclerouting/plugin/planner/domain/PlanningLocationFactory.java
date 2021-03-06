/*
 * Copyright 2020 Red Hat, Inc. and/or its affiliates.
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

package org.optaweb.vehiclerouting.plugin.planner.domain;

import org.optaweb.vehiclerouting.domain.Location;

/**
 * Creates {@link PlanningLocation}s.
 */
public class PlanningLocationFactory {

    private PlanningLocationFactory() {
        throw new AssertionError("Utility class");
    }

    public static PlanningLocation fromDomain(Location location) {
        // TODO set distance map
        return new PlanningLocation(
                location.id(),
                location.coordinates().latitude().doubleValue(),
                location.coordinates().longitude().doubleValue()
        );
    }
}
