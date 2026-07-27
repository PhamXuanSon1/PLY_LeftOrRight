var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i8450 = root || request.c( 'UnityEngine.JointSpring' )
  var i8451 = data
  i8450.spring = i8451[0]
  i8450.damper = i8451[1]
  i8450.targetPosition = i8451[2]
  return i8450
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i8452 = root || request.c( 'UnityEngine.JointMotor' )
  var i8453 = data
  i8452.m_TargetVelocity = i8453[0]
  i8452.m_Force = i8453[1]
  i8452.m_FreeSpin = i8453[2]
  return i8452
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i8454 = root || request.c( 'UnityEngine.JointLimits' )
  var i8455 = data
  i8454.m_Min = i8455[0]
  i8454.m_Max = i8455[1]
  i8454.m_Bounciness = i8455[2]
  i8454.m_BounceMinVelocity = i8455[3]
  i8454.m_ContactDistance = i8455[4]
  i8454.minBounce = i8455[5]
  i8454.maxBounce = i8455[6]
  return i8454
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i8456 = root || request.c( 'UnityEngine.JointDrive' )
  var i8457 = data
  i8456.m_PositionSpring = i8457[0]
  i8456.m_PositionDamper = i8457[1]
  i8456.m_MaximumForce = i8457[2]
  i8456.m_UseAcceleration = i8457[3]
  return i8456
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i8458 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i8459 = data
  i8458.m_Spring = i8459[0]
  i8458.m_Damper = i8459[1]
  return i8458
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i8460 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i8461 = data
  i8460.m_Limit = i8461[0]
  i8460.m_Bounciness = i8461[1]
  i8460.m_ContactDistance = i8461[2]
  return i8460
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i8462 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i8463 = data
  i8462.m_ExtremumSlip = i8463[0]
  i8462.m_ExtremumValue = i8463[1]
  i8462.m_AsymptoteSlip = i8463[2]
  i8462.m_AsymptoteValue = i8463[3]
  i8462.m_Stiffness = i8463[4]
  return i8462
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i8464 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i8465 = data
  i8464.m_LowerAngle = i8465[0]
  i8464.m_UpperAngle = i8465[1]
  return i8464
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i8466 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i8467 = data
  i8466.m_MotorSpeed = i8467[0]
  i8466.m_MaximumMotorTorque = i8467[1]
  return i8466
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i8468 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i8469 = data
  i8468.m_DampingRatio = i8469[0]
  i8468.m_Frequency = i8469[1]
  i8468.m_Angle = i8469[2]
  return i8468
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i8470 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i8471 = data
  i8470.m_LowerTranslation = i8471[0]
  i8470.m_UpperTranslation = i8471[1]
  return i8470
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i8472 = root || new pc.UnityMaterial()
  var i8473 = data
  i8472.name = i8473[0]
  request.r(i8473[1], i8473[2], 0, i8472, 'shader')
  i8472.renderQueue = i8473[3]
  i8472.enableInstancing = !!i8473[4]
  var i8475 = i8473[5]
  var i8474 = []
  for(var i = 0; i < i8475.length; i += 1) {
    i8474.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i8475[i + 0]) );
  }
  i8472.floatParameters = i8474
  var i8477 = i8473[6]
  var i8476 = []
  for(var i = 0; i < i8477.length; i += 1) {
    i8476.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i8477[i + 0]) );
  }
  i8472.colorParameters = i8476
  var i8479 = i8473[7]
  var i8478 = []
  for(var i = 0; i < i8479.length; i += 1) {
    i8478.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i8479[i + 0]) );
  }
  i8472.vectorParameters = i8478
  var i8481 = i8473[8]
  var i8480 = []
  for(var i = 0; i < i8481.length; i += 1) {
    i8480.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i8481[i + 0]) );
  }
  i8472.textureParameters = i8480
  var i8483 = i8473[9]
  var i8482 = []
  for(var i = 0; i < i8483.length; i += 1) {
    i8482.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i8483[i + 0]) );
  }
  i8472.materialFlags = i8482
  return i8472
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i8486 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i8487 = data
  i8486.name = i8487[0]
  i8486.value = i8487[1]
  return i8486
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i8490 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i8491 = data
  i8490.name = i8491[0]
  i8490.value = new pc.Color(i8491[1], i8491[2], i8491[3], i8491[4])
  return i8490
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i8494 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i8495 = data
  i8494.name = i8495[0]
  i8494.value = new pc.Vec4( i8495[1], i8495[2], i8495[3], i8495[4] )
  return i8494
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i8498 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i8499 = data
  i8498.name = i8499[0]
  request.r(i8499[1], i8499[2], 0, i8498, 'value')
  return i8498
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i8502 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i8503 = data
  i8502.name = i8503[0]
  i8502.enabled = !!i8503[1]
  return i8502
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i8504 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i8505 = data
  i8504.name = i8505[0]
  i8504.width = i8505[1]
  i8504.height = i8505[2]
  i8504.mipmapCount = i8505[3]
  i8504.anisoLevel = i8505[4]
  i8504.filterMode = i8505[5]
  i8504.hdr = !!i8505[6]
  i8504.format = i8505[7]
  i8504.wrapMode = i8505[8]
  i8504.alphaIsTransparency = !!i8505[9]
  i8504.alphaSource = i8505[10]
  i8504.graphicsFormat = i8505[11]
  i8504.sRGBTexture = !!i8505[12]
  i8504.desiredColorSpace = i8505[13]
  i8504.wrapU = i8505[14]
  i8504.wrapV = i8505[15]
  return i8504
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i8506 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i8507 = data
  i8506.name = i8507[0]
  i8506.halfPrecision = !!i8507[1]
  i8506.useSimplification = !!i8507[2]
  i8506.useUInt32IndexFormat = !!i8507[3]
  i8506.vertexCount = i8507[4]
  i8506.aabb = i8507[5]
  var i8509 = i8507[6]
  var i8508 = []
  for(var i = 0; i < i8509.length; i += 1) {
    i8508.push( !!i8509[i + 0] );
  }
  i8506.streams = i8508
  i8506.vertices = i8507[7]
  var i8511 = i8507[8]
  var i8510 = []
  for(var i = 0; i < i8511.length; i += 1) {
    i8510.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i8511[i + 0]) );
  }
  i8506.subMeshes = i8510
  var i8513 = i8507[9]
  var i8512 = []
  for(var i = 0; i < i8513.length; i += 16) {
    i8512.push( new pc.Mat4().setData(i8513[i + 0], i8513[i + 1], i8513[i + 2], i8513[i + 3],  i8513[i + 4], i8513[i + 5], i8513[i + 6], i8513[i + 7],  i8513[i + 8], i8513[i + 9], i8513[i + 10], i8513[i + 11],  i8513[i + 12], i8513[i + 13], i8513[i + 14], i8513[i + 15]) );
  }
  i8506.bindposes = i8512
  var i8515 = i8507[10]
  var i8514 = []
  for(var i = 0; i < i8515.length; i += 1) {
    i8514.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i8515[i + 0]) );
  }
  i8506.blendShapes = i8514
  return i8506
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i8520 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i8521 = data
  i8520.triangles = i8521[0]
  return i8520
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i8526 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i8527 = data
  i8526.name = i8527[0]
  var i8529 = i8527[1]
  var i8528 = []
  for(var i = 0; i < i8529.length; i += 1) {
    i8528.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i8529[i + 0]) );
  }
  i8526.frames = i8528
  return i8526
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i8530 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i8531 = data
  i8530.position = new pc.Vec3( i8531[0], i8531[1], i8531[2] )
  i8530.scale = new pc.Vec3( i8531[3], i8531[4], i8531[5] )
  i8530.rotation = new pc.Quat(i8531[6], i8531[7], i8531[8], i8531[9])
  return i8530
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i8532 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i8533 = data
  request.r(i8533[0], i8533[1], 0, i8532, 'animatorController')
  request.r(i8533[2], i8533[3], 0, i8532, 'avatar')
  i8532.updateMode = i8533[4]
  i8532.hasTransformHierarchy = !!i8533[5]
  i8532.applyRootMotion = !!i8533[6]
  var i8535 = i8533[7]
  var i8534 = []
  for(var i = 0; i < i8535.length; i += 2) {
  request.r(i8535[i + 0], i8535[i + 1], 2, i8534, '')
  }
  i8532.humanBones = i8534
  i8532.enabled = !!i8533[8]
  return i8532
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer"] = function (request, data, root) {
  var i8538 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer' )
  var i8539 = data
  i8538.color = new pc.Color(i8539[0], i8539[1], i8539[2], i8539[3])
  request.r(i8539[4], i8539[5], 0, i8538, 'sprite')
  i8538.flipX = !!i8539[6]
  i8538.flipY = !!i8539[7]
  i8538.drawMode = i8539[8]
  i8538.size = new pc.Vec2( i8539[9], i8539[10] )
  i8538.tileMode = i8539[11]
  i8538.adaptiveModeThreshold = i8539[12]
  i8538.maskInteraction = i8539[13]
  i8538.spriteSortPoint = i8539[14]
  i8538.enabled = !!i8539[15]
  request.r(i8539[16], i8539[17], 0, i8538, 'sharedMaterial')
  var i8541 = i8539[18]
  var i8540 = []
  for(var i = 0; i < i8541.length; i += 2) {
  request.r(i8541[i + 0], i8541[i + 1], 2, i8540, '')
  }
  i8538.sharedMaterials = i8540
  i8538.receiveShadows = !!i8539[19]
  i8538.shadowCastingMode = i8539[20]
  i8538.sortingLayerID = i8539[21]
  i8538.sortingOrder = i8539[22]
  i8538.lightmapIndex = i8539[23]
  i8538.lightmapSceneIndex = i8539[24]
  i8538.lightmapScaleOffset = new pc.Vec4( i8539[25], i8539[26], i8539[27], i8539[28] )
  i8538.lightProbeUsage = i8539[29]
  i8538.reflectionProbeUsage = i8539[30]
  return i8538
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i8544 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i8545 = data
  i8544.name = i8545[0]
  i8544.tagId = i8545[1]
  i8544.enabled = !!i8545[2]
  i8544.isStatic = !!i8545[3]
  i8544.layer = i8545[4]
  return i8544
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i8546 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i8547 = data
  i8546.name = i8547[0]
  i8546.index = i8547[1]
  i8546.startup = !!i8547[2]
  return i8546
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i8548 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i8549 = data
  i8548.aspect = i8549[0]
  i8548.orthographic = !!i8549[1]
  i8548.orthographicSize = i8549[2]
  i8548.backgroundColor = new pc.Color(i8549[3], i8549[4], i8549[5], i8549[6])
  i8548.nearClipPlane = i8549[7]
  i8548.farClipPlane = i8549[8]
  i8548.fieldOfView = i8549[9]
  i8548.depth = i8549[10]
  i8548.clearFlags = i8549[11]
  i8548.cullingMask = i8549[12]
  i8548.rect = i8549[13]
  request.r(i8549[14], i8549[15], 0, i8548, 'targetTexture')
  i8548.usePhysicalProperties = !!i8549[16]
  i8548.focalLength = i8549[17]
  i8548.sensorSize = new pc.Vec2( i8549[18], i8549[19] )
  i8548.lensShift = new pc.Vec2( i8549[20], i8549[21] )
  i8548.gateFit = i8549[22]
  i8548.commandBufferCount = i8549[23]
  i8548.cameraType = i8549[24]
  i8548.enabled = !!i8549[25]
  return i8548
}

Deserializers["AutoCameraFit"] = function (request, data, root) {
  var i8550 = root || request.c( 'AutoCameraFit' )
  var i8551 = data
  request.r(i8551[0], i8551[1], 0, i8550, 'tallScreenObject')
  i8550.tallScreenRatioThreshold = i8551[2]
  i8550.tallScreenYOffset = i8551[3]
  request.r(i8551[4], i8551[5], 0, i8550, 'canvasBtn')
  request.r(i8551[6], i8551[7], 0, i8550, 'targetArea')
  i8550.paddingLandscape = i8551[8]
  i8550.paddingPortrait = i8551[9]
  i8550.extraPaddingSmallScreen = i8551[10]
  i8550.smallScreenThreshold = i8551[11]
  i8550.autoUpdateOnResize = !!i8551[12]
  i8550.adjustInEditMode = !!i8551[13]
  return i8550
}

Deserializers["CharacterManager"] = function (request, data, root) {
  var i8552 = root || request.c( 'CharacterManager' )
  var i8553 = data
  var i8555 = i8553[0]
  var i8554 = new (System.Collections.Generic.List$1(Bridge.ns('CharacterEquipmentSetup')))
  for(var i = 0; i < i8555.length; i += 1) {
    i8554.add(request.d('CharacterEquipmentSetup', i8555[i + 0]));
  }
  i8552.characterSetups = i8554
  request.r(i8553[1], i8553[2], 0, i8552, 'character1')
  request.r(i8553[3], i8553[4], 0, i8552, 'targetTestCharacter')
  request.r(i8553[5], i8553[6], 0, i8552, 'testEquipmentDataAsset')
  var i8557 = i8553[7]
  var i8556 = new (System.Collections.Generic.List$1(Bridge.ns('SkinToggleEntry')))
  for(var i = 0; i < i8557.length; i += 1) {
    i8556.add(request.d('SkinToggleEntry', i8557[i + 0]));
  }
  i8552.mySkinSet = i8556
  return i8552
}

Deserializers["CharacterEquipmentSetup"] = function (request, data, root) {
  var i8560 = root || request.c( 'CharacterEquipmentSetup' )
  var i8561 = data
  request.r(i8561[0], i8561[1], 0, i8560, 'character')
  request.r(i8561[2], i8561[3], 0, i8560, 'equipmentData')
  return i8560
}

Deserializers["SkinToggleEntry"] = function (request, data, root) {
  var i8564 = root || request.c( 'SkinToggleEntry' )
  var i8565 = data
  i8564.isEnabled = !!i8565[0]
  i8564.skinName = i8565[1]
  request.r(i8565[2], i8565[3], 0, i8564, 'skeletonDataAsset')
  return i8564
}

Deserializers["GameManager"] = function (request, data, root) {
  var i8566 = root || request.c( 'GameManager' )
  var i8567 = data
  i8566.isGoogleBuild = !!i8567[0]
  var i8569 = i8567[1]
  var i8568 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.GameObject')))
  for(var i = 0; i < i8569.length; i += 2) {
  request.r(i8569[i + 0], i8569[i + 1], 1, i8568, '')
  }
  i8566.googleDisabledObjects = i8568
  var i8571 = i8567[2]
  var i8570 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Behaviour')))
  for(var i = 0; i < i8571.length; i += 2) {
  request.r(i8571[i + 0], i8571[i + 1], 1, i8570, '')
  }
  i8566.googleDisabledBehaviours = i8570
  return i8566
}

Deserializers["SlotManager"] = function (request, data, root) {
  var i8576 = root || request.c( 'SlotManager' )
  var i8577 = data
  var i8579 = i8577[0]
  var i8578 = new (System.Collections.Generic.List$1(Bridge.ns('SlotSetup')))
  for(var i = 0; i < i8579.length; i += 2) {
  request.r(i8579[i + 0], i8579[i + 1], 1, i8578, '')
  }
  i8576.allSlots = i8578
  i8576.maxSlotsToPlay = i8577[1]
  request.r(i8577[2], i8577[3], 0, i8576, 'objectToHideOnFirstClick')
  request.r(i8577[4], i8577[5], 0, i8576, 'rightEffectPrefab')
  request.r(i8577[6], i8577[7], 0, i8576, 'rightEffectSpawnPoint')
  var i8581 = i8577[8]
  var i8580 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Sprite')))
  for(var i = 0; i < i8581.length; i += 2) {
  request.r(i8581[i + 0], i8581[i + 1], 1, i8580, '')
  }
  i8576.rightEffectSprites = i8580
  return i8576
}

Deserializers["Ply_Pool"] = function (request, data, root) {
  var i8586 = root || request.c( 'Ply_Pool' )
  var i8587 = data
  var i8589 = i8587[0]
  var i8588 = []
  for(var i = 0; i < i8589.length; i += 1) {
    i8588.push( request.d('Ply_Pool+PoolAmount', i8589[i + 0]) );
  }
  i8586.poolAmounts = i8588
  return i8586
}

Deserializers["Ply_Pool+PoolAmount"] = function (request, data, root) {
  var i8592 = root || request.c( 'Ply_Pool+PoolAmount' )
  var i8593 = data
  i8592.type = i8593[0]
  i8592.amount = i8593[1]
  request.r(i8593[2], i8593[3], 0, i8592, 'gameUnit')
  return i8592
}

Deserializers["Ply_SoundManager"] = function (request, data, root) {
  var i8594 = root || request.c( 'Ply_SoundManager' )
  var i8595 = data
  i8594.fxAudio = request.d('FxAudio', i8595[0], i8594.fxAudio)
  request.r(i8595[1], i8595[2], 0, i8594, 'bgm')
  return i8594
}

Deserializers["FxAudio"] = function (request, data, root) {
  var i8596 = root || request.c( 'FxAudio' )
  var i8597 = data
  i8596.Left = request.d('SoundData', i8597[0], i8596.Left)
  i8596.Right = request.d('SoundData', i8597[1], i8596.Right)
  i8596.Yeah = request.d('SoundData', i8597[2], i8596.Yeah)
  return i8596
}

Deserializers["SoundData"] = function (request, data, root) {
  var i8598 = root || request.c( 'SoundData' )
  var i8599 = data
  request.r(i8599[0], i8599[1], 0, i8598, 'clip')
  i8598.repeatCount = i8599[2]
  return i8598
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i8600 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i8601 = data
  request.r(i8601[0], i8601[1], 0, i8600, 'clip')
  request.r(i8601[2], i8601[3], 0, i8600, 'outputAudioMixerGroup')
  i8600.playOnAwake = !!i8601[4]
  i8600.loop = !!i8601[5]
  i8600.time = i8601[6]
  i8600.volume = i8601[7]
  i8600.pitch = i8601[8]
  i8600.enabled = !!i8601[9]
  return i8600
}

Deserializers["ProgressTrackingManager"] = function (request, data, root) {
  var i8602 = root || request.c( 'ProgressTrackingManager' )
  var i8603 = data
  i8602.maxScore = i8603[0]
  i8602.currentScore = i8603[1]
  i8602.currentPercent = i8603[2]
  return i8602
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i8604 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i8605 = data
  i8604.center = new pc.Vec3( i8605[0], i8605[1], i8605[2] )
  i8604.radius = i8605[3]
  i8604.height = i8605[4]
  i8604.direction = i8605[5]
  i8604.enabled = !!i8605[6]
  i8604.isTrigger = !!i8605[7]
  request.r(i8605[8], i8605[9], 0, i8604, 'material')
  return i8604
}

Deserializers["BalloonController"] = function (request, data, root) {
  var i8606 = root || request.c( 'BalloonController' )
  var i8607 = data
  request.r(i8607[0], i8607[1], 0, i8606, 'targetItem')
  i8606.interactableLayer = UnityEngine.LayerMask.FromIntegerValue( i8607[2] )
  i8606.flyDuration = i8607[3]
  i8606.scaleDuration = i8607[4]
  i8606.delayBeforeNextSlot = i8607[5]
  i8606.onBalloonClicked = request.d('UnityEngine.Events.UnityEvent', i8607[6], i8606.onBalloonClicked)
  return i8606
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i8608 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i8609 = data
  i8608.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i8609[0], i8608.m_PersistentCalls)
  return i8608
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i8610 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i8611 = data
  var i8613 = i8611[0]
  var i8612 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i8613.length; i += 1) {
    i8612.add(request.d('UnityEngine.Events.PersistentCall', i8613[i + 0]));
  }
  i8610.m_Calls = i8612
  return i8610
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i8616 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i8617 = data
  request.r(i8617[0], i8617[1], 0, i8616, 'm_Target')
  i8616.m_TargetAssemblyTypeName = i8617[2]
  i8616.m_MethodName = i8617[3]
  i8616.m_Mode = i8617[4]
  i8616.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i8617[5], i8616.m_Arguments)
  i8616.m_CallState = i8617[6]
  return i8616
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i8618 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i8619 = data
  request.r(i8619[0], i8619[1], 0, i8618, 'm_ObjectArgument')
  i8618.m_ObjectArgumentAssemblyTypeName = i8619[2]
  i8618.m_IntArgument = i8619[3]
  i8618.m_FloatArgument = i8619[4]
  i8618.m_StringArgument = i8619[5]
  i8618.m_BoolArgument = !!i8619[6]
  return i8618
}

Deserializers["BalloonActionTrigger"] = function (request, data, root) {
  var i8620 = root || request.c( 'BalloonActionTrigger' )
  var i8621 = data
  request.r(i8621[0], i8621[1], 0, i8620, 'targetCharacter')
  i8620.animationTrack = i8621[2]
  i8620.animationName = i8621[3]
  i8620.clearOtherAnimations = !!i8621[4]
  request.r(i8621[5], i8621[6], 0, i8620, 'skeletonDataAsset')
  return i8620
}

Deserializers["SlotSetup"] = function (request, data, root) {
  var i8622 = root || request.c( 'SlotSetup' )
  var i8623 = data
  request.r(i8623[0], i8623[1], 0, i8622, 'slotData')
  request.r(i8623[2], i8623[3], 0, i8622, 'borderGold')
  request.r(i8623[4], i8623[5], 0, i8622, 'borderWhite')
  request.r(i8623[6], i8623[7], 0, i8622, 'greyCard')
  request.r(i8623[8], i8623[9], 0, i8622, 'blueCard')
  request.r(i8623[10], i8623[11], 0, i8622, 'greenCard')
  request.r(i8623[12], i8623[13], 0, i8622, 'greenTick')
  request.r(i8623[14], i8623[15], 0, i8622, 'leftBalloonObj')
  request.r(i8623[16], i8623[17], 0, i8622, 'rightBalloonObj')
  request.r(i8623[18], i8623[19], 0, i8622, 'leftBalloonItemRenderer')
  request.r(i8623[20], i8623[21], 0, i8622, 'rightBalloonItemRenderer')
  return i8622
}

Deserializers["ScreenHeightPositionAnchor"] = function (request, data, root) {
  var i8624 = root || request.c( 'ScreenHeightPositionAnchor' )
  var i8625 = data
  request.r(i8625[0], i8625[1], 0, i8624, 'anchorPoint')
  request.r(i8625[2], i8625[3], 0, i8624, 'targetCamera')
  i8624.viewportYRatio = i8625[4]
  i8624.alignOnStart = !!i8625[5]
  i8624.alignOnEnable = !!i8625[6]
  i8624.alwaysUpdate = !!i8625[7]
  i8624.realignOnScreenSizeChanged = !!i8625[8]
  i8624.drawGizmos = !!i8625[9]
  i8624.targetLineColor = new pc.Color(i8625[10], i8625[11], i8625[12], i8625[13])
  i8624.anchorColor = new pc.Color(i8625[14], i8625[15], i8625[16], i8625[17])
  return i8624
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i8626 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i8627 = data
  request.r(i8627[0], i8627[1], 0, i8626, 'sharedMesh')
  return i8626
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i8628 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i8629 = data
  request.r(i8629[0], i8629[1], 0, i8628, 'additionalVertexStreams')
  i8628.enabled = !!i8629[2]
  request.r(i8629[3], i8629[4], 0, i8628, 'sharedMaterial')
  var i8631 = i8629[5]
  var i8630 = []
  for(var i = 0; i < i8631.length; i += 2) {
  request.r(i8631[i + 0], i8631[i + 1], 2, i8630, '')
  }
  i8628.sharedMaterials = i8630
  i8628.receiveShadows = !!i8629[6]
  i8628.shadowCastingMode = i8629[7]
  i8628.sortingLayerID = i8629[8]
  i8628.sortingOrder = i8629[9]
  i8628.lightmapIndex = i8629[10]
  i8628.lightmapSceneIndex = i8629[11]
  i8628.lightmapScaleOffset = new pc.Vec4( i8629[12], i8629[13], i8629[14], i8629[15] )
  i8628.lightProbeUsage = i8629[16]
  i8628.reflectionProbeUsage = i8629[17]
  return i8628
}

Deserializers["Spine.Unity.SkeletonAnimation"] = function (request, data, root) {
  var i8632 = root || request.c( 'Spine.Unity.SkeletonAnimation' )
  var i8633 = data
  i8632.loop = !!i8633[0]
  i8632.timeScale = i8633[1]
  request.r(i8633[2], i8633[3], 0, i8632, 'skeletonDataAsset')
  i8632.initialSkinName = i8633[4]
  i8632.fixPrefabOverrideViaMeshFilter = i8633[5]
  i8632.initialFlipX = !!i8633[6]
  i8632.initialFlipY = !!i8633[7]
  i8632.updateWhenInvisible = i8633[8]
  i8632.zSpacing = i8633[9]
  i8632.useClipping = !!i8633[10]
  i8632.immutableTriangles = !!i8633[11]
  i8632.pmaVertexColors = !!i8633[12]
  i8632.clearStateOnDisable = !!i8633[13]
  i8632.tintBlack = !!i8633[14]
  i8632.singleSubmesh = !!i8633[15]
  i8632.fixDrawOrder = !!i8633[16]
  i8632.addNormals = !!i8633[17]
  i8632.calculateTangents = !!i8633[18]
  i8632.maskInteraction = i8633[19]
  i8632.maskMaterials = request.d('Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials', i8633[20], i8632.maskMaterials)
  i8632.disableRenderingOnOverride = !!i8633[21]
  i8632.updateTiming = i8633[22]
  i8632.unscaledTime = !!i8633[23]
  i8632._animationName = i8633[24]
  var i8635 = i8633[25]
  var i8634 = []
  for(var i = 0; i < i8635.length; i += 1) {
    i8634.push( i8635[i + 0] );
  }
  i8632.separatorSlotNames = i8634
  i8632.physicsPositionInheritanceFactor = new pc.Vec2( i8633[26], i8633[27] )
  i8632.physicsRotationInheritanceFactor = i8633[28]
  request.r(i8633[29], i8633[30], 0, i8632, 'physicsMovementRelativeTo')
  return i8632
}

Deserializers["Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials"] = function (request, data, root) {
  var i8636 = root || request.c( 'Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials' )
  var i8637 = data
  var i8639 = i8637[0]
  var i8638 = []
  for(var i = 0; i < i8639.length; i += 2) {
  request.r(i8639[i + 0], i8639[i + 1], 2, i8638, '')
  }
  i8636.materialsMaskDisabled = i8638
  var i8641 = i8637[1]
  var i8640 = []
  for(var i = 0; i < i8641.length; i += 2) {
  request.r(i8641[i + 0], i8641[i + 1], 2, i8640, '')
  }
  i8636.materialsInsideMask = i8640
  var i8643 = i8637[2]
  var i8642 = []
  for(var i = 0; i < i8643.length; i += 2) {
  request.r(i8643[i + 0], i8643[i + 1], 2, i8642, '')
  }
  i8636.materialsOutsideMask = i8642
  return i8636
}

Deserializers["Character"] = function (request, data, root) {
  var i8646 = root || request.c( 'Character' )
  var i8647 = data
  var i8649 = i8647[0]
  var i8648 = new (System.Collections.Generic.List$1(Bridge.ns('System.String')))
  for(var i = 0; i < i8649.length; i += 1) {
    i8648.add(i8649[i + 0]);
  }
  i8646.currentAppliedSkinNames = i8648
  request.r(i8647[1], i8647[2], 0, i8646, 'tf')
  request.r(i8647[3], i8647[4], 0, i8646, 'skeletonAnimation')
  var i8651 = i8647[5]
  var i8650 = new (System.Collections.Generic.List$1(Bridge.ns('SlotAttachmentPair')))
  for(var i = 0; i < i8651.length; i += 1) {
    i8650.add(request.d('SlotAttachmentPair', i8651[i + 0]));
  }
  i8646.currentAppliedPairs = i8650
  return i8646
}

Deserializers["SlotAttachmentPair"] = function (request, data, root) {
  var i8656 = root || request.c( 'SlotAttachmentPair' )
  var i8657 = data
  i8656.isEnabled = !!i8657[0]
  i8656.slotName = i8657[1]
  i8656.attachmentName = i8657[2]
  request.r(i8657[3], i8657[4], 0, i8656, 'skeletonDataAsset')
  return i8656
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i8658 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i8659 = data
  i8658.pivot = new pc.Vec2( i8659[0], i8659[1] )
  i8658.anchorMin = new pc.Vec2( i8659[2], i8659[3] )
  i8658.anchorMax = new pc.Vec2( i8659[4], i8659[5] )
  i8658.sizeDelta = new pc.Vec2( i8659[6], i8659[7] )
  i8658.anchoredPosition3D = new pc.Vec3( i8659[8], i8659[9], i8659[10] )
  i8658.rotation = new pc.Quat(i8659[11], i8659[12], i8659[13], i8659[14])
  i8658.scale = new pc.Vec3( i8659[15], i8659[16], i8659[17] )
  return i8658
}

Deserializers["TMPro.TextMeshPro"] = function (request, data, root) {
  var i8660 = root || request.c( 'TMPro.TextMeshPro' )
  var i8661 = data
  i8660._SortingLayer = i8661[0]
  i8660._SortingLayerID = i8661[1]
  i8660._SortingOrder = i8661[2]
  i8660.m_hasFontAssetChanged = !!i8661[3]
  request.r(i8661[4], i8661[5], 0, i8660, 'm_renderer')
  i8660.m_maskType = i8661[6]
  i8660.m_text = i8661[7]
  i8660.m_isRightToLeft = !!i8661[8]
  request.r(i8661[9], i8661[10], 0, i8660, 'm_fontAsset')
  request.r(i8661[11], i8661[12], 0, i8660, 'm_sharedMaterial')
  var i8663 = i8661[13]
  var i8662 = []
  for(var i = 0; i < i8663.length; i += 2) {
  request.r(i8663[i + 0], i8663[i + 1], 2, i8662, '')
  }
  i8660.m_fontSharedMaterials = i8662
  request.r(i8661[14], i8661[15], 0, i8660, 'm_fontMaterial')
  var i8665 = i8661[16]
  var i8664 = []
  for(var i = 0; i < i8665.length; i += 2) {
  request.r(i8665[i + 0], i8665[i + 1], 2, i8664, '')
  }
  i8660.m_fontMaterials = i8664
  i8660.m_fontColor32 = UnityEngine.Color32.ConstructColor(i8661[17], i8661[18], i8661[19], i8661[20])
  i8660.m_fontColor = new pc.Color(i8661[21], i8661[22], i8661[23], i8661[24])
  i8660.m_enableVertexGradient = !!i8661[25]
  i8660.m_colorMode = i8661[26]
  i8660.m_fontColorGradient = request.d('TMPro.VertexGradient', i8661[27], i8660.m_fontColorGradient)
  request.r(i8661[28], i8661[29], 0, i8660, 'm_fontColorGradientPreset')
  request.r(i8661[30], i8661[31], 0, i8660, 'm_spriteAsset')
  i8660.m_tintAllSprites = !!i8661[32]
  request.r(i8661[33], i8661[34], 0, i8660, 'm_StyleSheet')
  i8660.m_TextStyleHashCode = i8661[35]
  i8660.m_overrideHtmlColors = !!i8661[36]
  i8660.m_faceColor = UnityEngine.Color32.ConstructColor(i8661[37], i8661[38], i8661[39], i8661[40])
  i8660.m_fontSize = i8661[41]
  i8660.m_fontSizeBase = i8661[42]
  i8660.m_fontWeight = i8661[43]
  i8660.m_enableAutoSizing = !!i8661[44]
  i8660.m_fontSizeMin = i8661[45]
  i8660.m_fontSizeMax = i8661[46]
  i8660.m_fontStyle = i8661[47]
  i8660.m_HorizontalAlignment = i8661[48]
  i8660.m_VerticalAlignment = i8661[49]
  i8660.m_textAlignment = i8661[50]
  i8660.m_characterSpacing = i8661[51]
  i8660.m_wordSpacing = i8661[52]
  i8660.m_lineSpacing = i8661[53]
  i8660.m_lineSpacingMax = i8661[54]
  i8660.m_paragraphSpacing = i8661[55]
  i8660.m_charWidthMaxAdj = i8661[56]
  i8660.m_TextWrappingMode = i8661[57]
  i8660.m_wordWrappingRatios = i8661[58]
  i8660.m_overflowMode = i8661[59]
  request.r(i8661[60], i8661[61], 0, i8660, 'm_linkedTextComponent')
  request.r(i8661[62], i8661[63], 0, i8660, 'parentLinkedComponent')
  i8660.m_enableKerning = !!i8661[64]
  var i8667 = i8661[65]
  var i8666 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i8667.length; i += 1) {
    i8666.add(i8667[i + 0]);
  }
  i8660.m_ActiveFontFeatures = i8666
  i8660.m_enableExtraPadding = !!i8661[66]
  i8660.checkPaddingRequired = !!i8661[67]
  i8660.m_isRichText = !!i8661[68]
  i8660.m_parseCtrlCharacters = !!i8661[69]
  i8660.m_isOrthographic = !!i8661[70]
  i8660.m_isCullingEnabled = !!i8661[71]
  i8660.m_horizontalMapping = i8661[72]
  i8660.m_verticalMapping = i8661[73]
  i8660.m_uvLineOffset = i8661[74]
  i8660.m_geometrySortingOrder = i8661[75]
  i8660.m_IsTextObjectScaleStatic = !!i8661[76]
  i8660.m_VertexBufferAutoSizeReduction = !!i8661[77]
  i8660.m_useMaxVisibleDescender = !!i8661[78]
  i8660.m_pageToDisplay = i8661[79]
  i8660.m_margin = new pc.Vec4( i8661[80], i8661[81], i8661[82], i8661[83] )
  i8660.m_isUsingLegacyAnimationComponent = !!i8661[84]
  i8660.m_isVolumetricText = !!i8661[85]
  request.r(i8661[86], i8661[87], 0, i8660, 'm_Material')
  i8660.m_EmojiFallbackSupport = !!i8661[88]
  i8660.m_Maskable = !!i8661[89]
  i8660.m_Color = new pc.Color(i8661[90], i8661[91], i8661[92], i8661[93])
  i8660.m_RaycastTarget = !!i8661[94]
  i8660.m_RaycastPadding = new pc.Vec4( i8661[95], i8661[96], i8661[97], i8661[98] )
  return i8660
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i8668 = root || request.c( 'TMPro.VertexGradient' )
  var i8669 = data
  i8668.topLeft = new pc.Color(i8669[0], i8669[1], i8669[2], i8669[3])
  i8668.topRight = new pc.Color(i8669[4], i8669[5], i8669[6], i8669[7])
  i8668.bottomLeft = new pc.Color(i8669[8], i8669[9], i8669[10], i8669[11])
  i8668.bottomRight = new pc.Color(i8669[12], i8669[13], i8669[14], i8669[15])
  return i8668
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i8672 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i8673 = data
  request.r(i8673[0], i8673[1], 0, i8672, 'm_FirstSelected')
  i8672.m_sendNavigationEvents = !!i8673[2]
  i8672.m_DragThreshold = i8673[3]
  return i8672
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i8674 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i8675 = data
  i8674.m_HorizontalAxis = i8675[0]
  i8674.m_VerticalAxis = i8675[1]
  i8674.m_SubmitButton = i8675[2]
  i8674.m_CancelButton = i8675[3]
  i8674.m_InputActionsPerSecond = i8675[4]
  i8674.m_RepeatDelay = i8675[5]
  i8674.m_ForceModuleActive = !!i8675[6]
  i8674.m_SendPointerHoverToParent = !!i8675[7]
  return i8674
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i8676 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i8677 = data
  i8676.ambientIntensity = i8677[0]
  i8676.reflectionIntensity = i8677[1]
  i8676.ambientMode = i8677[2]
  i8676.ambientLight = new pc.Color(i8677[3], i8677[4], i8677[5], i8677[6])
  i8676.ambientSkyColor = new pc.Color(i8677[7], i8677[8], i8677[9], i8677[10])
  i8676.ambientGroundColor = new pc.Color(i8677[11], i8677[12], i8677[13], i8677[14])
  i8676.ambientEquatorColor = new pc.Color(i8677[15], i8677[16], i8677[17], i8677[18])
  i8676.fogColor = new pc.Color(i8677[19], i8677[20], i8677[21], i8677[22])
  i8676.fogEndDistance = i8677[23]
  i8676.fogStartDistance = i8677[24]
  i8676.fogDensity = i8677[25]
  i8676.fog = !!i8677[26]
  request.r(i8677[27], i8677[28], 0, i8676, 'skybox')
  i8676.fogMode = i8677[29]
  var i8679 = i8677[30]
  var i8678 = []
  for(var i = 0; i < i8679.length; i += 1) {
    i8678.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i8679[i + 0]) );
  }
  i8676.lightmaps = i8678
  i8676.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i8677[31], i8676.lightProbes)
  i8676.lightmapsMode = i8677[32]
  i8676.mixedBakeMode = i8677[33]
  i8676.environmentLightingMode = i8677[34]
  i8676.ambientProbe = new pc.SphericalHarmonicsL2(i8677[35])
  i8676.referenceAmbientProbe = new pc.SphericalHarmonicsL2(i8677[36])
  i8676.useReferenceAmbientProbe = !!i8677[37]
  request.r(i8677[38], i8677[39], 0, i8676, 'customReflection')
  request.r(i8677[40], i8677[41], 0, i8676, 'defaultReflection')
  i8676.defaultReflectionMode = i8677[42]
  i8676.defaultReflectionResolution = i8677[43]
  i8676.sunLightObjectId = i8677[44]
  i8676.pixelLightCount = i8677[45]
  i8676.defaultReflectionHDR = !!i8677[46]
  i8676.hasLightDataAsset = !!i8677[47]
  i8676.hasManualGenerate = !!i8677[48]
  return i8676
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i8682 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i8683 = data
  request.r(i8683[0], i8683[1], 0, i8682, 'lightmapColor')
  request.r(i8683[2], i8683[3], 0, i8682, 'lightmapDirection')
  request.r(i8683[4], i8683[5], 0, i8682, 'shadowMask')
  return i8682
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i8684 = root || new UnityEngine.LightProbes()
  var i8685 = data
  return i8684
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i8692 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i8693 = data
  var i8695 = i8693[0]
  var i8694 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i8695.length; i += 1) {
    i8694.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i8695[i + 0]));
  }
  i8692.ShaderCompilationErrors = i8694
  i8692.name = i8693[1]
  i8692.guid = i8693[2]
  var i8697 = i8693[3]
  var i8696 = []
  for(var i = 0; i < i8697.length; i += 1) {
    i8696.push( i8697[i + 0] );
  }
  i8692.shaderDefinedKeywords = i8696
  var i8699 = i8693[4]
  var i8698 = []
  for(var i = 0; i < i8699.length; i += 1) {
    i8698.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i8699[i + 0]) );
  }
  i8692.passes = i8698
  var i8701 = i8693[5]
  var i8700 = []
  for(var i = 0; i < i8701.length; i += 1) {
    i8700.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i8701[i + 0]) );
  }
  i8692.usePasses = i8700
  var i8703 = i8693[6]
  var i8702 = []
  for(var i = 0; i < i8703.length; i += 1) {
    i8702.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i8703[i + 0]) );
  }
  i8692.defaultParameterValues = i8702
  request.r(i8693[7], i8693[8], 0, i8692, 'unityFallbackShader')
  i8692.readDepth = !!i8693[9]
  i8692.hasDepthOnlyPass = !!i8693[10]
  i8692.isCreatedByShaderGraph = !!i8693[11]
  i8692.disableBatching = !!i8693[12]
  i8692.compiled = !!i8693[13]
  return i8692
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i8706 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i8707 = data
  i8706.shaderName = i8707[0]
  i8706.errorMessage = i8707[1]
  return i8706
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i8710 = root || new pc.UnityShaderPass()
  var i8711 = data
  i8710.id = i8711[0]
  i8710.subShaderIndex = i8711[1]
  i8710.name = i8711[2]
  i8710.passType = i8711[3]
  i8710.grabPassTextureName = i8711[4]
  i8710.usePass = !!i8711[5]
  i8710.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i8711[6], i8710.zTest)
  i8710.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i8711[7], i8710.zWrite)
  i8710.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i8711[8], i8710.culling)
  i8710.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i8711[9], i8710.blending)
  i8710.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i8711[10], i8710.alphaBlending)
  i8710.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i8711[11], i8710.colorWriteMask)
  i8710.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i8711[12], i8710.offsetUnits)
  i8710.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i8711[13], i8710.offsetFactor)
  i8710.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i8711[14], i8710.stencilRef)
  i8710.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i8711[15], i8710.stencilReadMask)
  i8710.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i8711[16], i8710.stencilWriteMask)
  i8710.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i8711[17], i8710.stencilOp)
  i8710.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i8711[18], i8710.stencilOpFront)
  i8710.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i8711[19], i8710.stencilOpBack)
  var i8713 = i8711[20]
  var i8712 = []
  for(var i = 0; i < i8713.length; i += 1) {
    i8712.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i8713[i + 0]) );
  }
  i8710.tags = i8712
  var i8715 = i8711[21]
  var i8714 = []
  for(var i = 0; i < i8715.length; i += 1) {
    i8714.push( i8715[i + 0] );
  }
  i8710.passDefinedKeywords = i8714
  var i8717 = i8711[22]
  var i8716 = []
  for(var i = 0; i < i8717.length; i += 1) {
    i8716.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i8717[i + 0]) );
  }
  i8710.passDefinedKeywordGroups = i8716
  var i8719 = i8711[23]
  var i8718 = []
  for(var i = 0; i < i8719.length; i += 1) {
    i8718.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i8719[i + 0]) );
  }
  i8710.variants = i8718
  var i8721 = i8711[24]
  var i8720 = []
  for(var i = 0; i < i8721.length; i += 1) {
    i8720.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i8721[i + 0]) );
  }
  i8710.excludedVariants = i8720
  i8710.hasDepthReader = !!i8711[25]
  return i8710
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i8722 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i8723 = data
  i8722.val = i8723[0]
  i8722.name = i8723[1]
  return i8722
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i8724 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i8725 = data
  i8724.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i8725[0], i8724.src)
  i8724.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i8725[1], i8724.dst)
  i8724.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i8725[2], i8724.op)
  return i8724
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i8726 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i8727 = data
  i8726.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i8727[0], i8726.pass)
  i8726.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i8727[1], i8726.fail)
  i8726.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i8727[2], i8726.zFail)
  i8726.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i8727[3], i8726.comp)
  return i8726
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i8730 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i8731 = data
  i8730.name = i8731[0]
  i8730.value = i8731[1]
  return i8730
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i8734 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i8735 = data
  var i8737 = i8735[0]
  var i8736 = []
  for(var i = 0; i < i8737.length; i += 1) {
    i8736.push( i8737[i + 0] );
  }
  i8734.keywords = i8736
  i8734.hasDiscard = !!i8735[1]
  return i8734
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i8740 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i8741 = data
  i8740.passId = i8741[0]
  i8740.subShaderIndex = i8741[1]
  var i8743 = i8741[2]
  var i8742 = []
  for(var i = 0; i < i8743.length; i += 1) {
    i8742.push( i8743[i + 0] );
  }
  i8740.keywords = i8742
  i8740.vertexProgram = i8741[3]
  i8740.fragmentProgram = i8741[4]
  i8740.exportedForWebGl2 = !!i8741[5]
  i8740.readDepth = !!i8741[6]
  return i8740
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i8746 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i8747 = data
  request.r(i8747[0], i8747[1], 0, i8746, 'shader')
  i8746.pass = i8747[2]
  return i8746
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i8750 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i8751 = data
  i8750.name = i8751[0]
  i8750.type = i8751[1]
  i8750.value = new pc.Vec4( i8751[2], i8751[3], i8751[4], i8751[5] )
  i8750.textureValue = i8751[6]
  i8750.shaderPropertyFlag = i8751[7]
  return i8750
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i8752 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i8753 = data
  i8752.name = i8753[0]
  request.r(i8753[1], i8753[2], 0, i8752, 'texture')
  i8752.aabb = i8753[3]
  i8752.vertices = i8753[4]
  i8752.triangles = i8753[5]
  i8752.textureRect = UnityEngine.Rect.MinMaxRect(i8753[6], i8753[7], i8753[8], i8753[9])
  i8752.packedRect = UnityEngine.Rect.MinMaxRect(i8753[10], i8753[11], i8753[12], i8753[13])
  i8752.border = new pc.Vec4( i8753[14], i8753[15], i8753[16], i8753[17] )
  i8752.transparency = i8753[18]
  i8752.bounds = i8753[19]
  i8752.pixelsPerUnit = i8753[20]
  i8752.textureWidth = i8753[21]
  i8752.textureHeight = i8753[22]
  i8752.nativeSize = new pc.Vec2( i8753[23], i8753[24] )
  i8752.pivot = new pc.Vec2( i8753[25], i8753[26] )
  i8752.textureRectOffset = new pc.Vec2( i8753[27], i8753[28] )
  return i8752
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i8754 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i8755 = data
  i8754.name = i8755[0]
  return i8754
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i8756 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i8757 = data
  i8756.name = i8757[0]
  i8756.wrapMode = i8757[1]
  i8756.isLooping = !!i8757[2]
  i8756.length = i8757[3]
  var i8759 = i8757[4]
  var i8758 = []
  for(var i = 0; i < i8759.length; i += 1) {
    i8758.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i8759[i + 0]) );
  }
  i8756.curves = i8758
  var i8761 = i8757[5]
  var i8760 = []
  for(var i = 0; i < i8761.length; i += 1) {
    i8760.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i8761[i + 0]) );
  }
  i8756.events = i8760
  i8756.halfPrecision = !!i8757[6]
  i8756._frameRate = i8757[7]
  i8756.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i8757[8], i8756.localBounds)
  i8756.hasMuscleCurves = !!i8757[9]
  var i8763 = i8757[10]
  var i8762 = []
  for(var i = 0; i < i8763.length; i += 1) {
    i8762.push( i8763[i + 0] );
  }
  i8756.clipMuscleConstant = i8762
  i8756.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i8757[11], i8756.clipBindingConstant)
  return i8756
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i8766 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i8767 = data
  i8766.path = i8767[0]
  i8766.hash = i8767[1]
  i8766.componentType = i8767[2]
  i8766.property = i8767[3]
  i8766.keys = i8767[4]
  var i8769 = i8767[5]
  var i8768 = []
  for(var i = 0; i < i8769.length; i += 1) {
    i8768.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i8769[i + 0]) );
  }
  i8766.objectReferenceKeys = i8768
  return i8766
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i8772 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i8773 = data
  i8772.time = i8773[0]
  request.r(i8773[1], i8773[2], 0, i8772, 'value')
  return i8772
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i8776 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i8777 = data
  i8776.functionName = i8777[0]
  i8776.floatParameter = i8777[1]
  i8776.intParameter = i8777[2]
  i8776.stringParameter = i8777[3]
  request.r(i8777[4], i8777[5], 0, i8776, 'objectReferenceParameter')
  i8776.time = i8777[6]
  return i8776
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i8778 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i8779 = data
  i8778.center = new pc.Vec3( i8779[0], i8779[1], i8779[2] )
  i8778.extends = new pc.Vec3( i8779[3], i8779[4], i8779[5] )
  return i8778
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i8782 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i8783 = data
  var i8785 = i8783[0]
  var i8784 = []
  for(var i = 0; i < i8785.length; i += 1) {
    i8784.push( i8785[i + 0] );
  }
  i8782.genericBindings = i8784
  var i8787 = i8783[1]
  var i8786 = []
  for(var i = 0; i < i8787.length; i += 1) {
    i8786.push( i8787[i + 0] );
  }
  i8782.pptrCurveMapping = i8786
  return i8782
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i8788 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i8789 = data
  i8788.name = i8789[0]
  i8788.ascent = i8789[1]
  i8788.originalLineHeight = i8789[2]
  i8788.fontSize = i8789[3]
  var i8791 = i8789[4]
  var i8790 = []
  for(var i = 0; i < i8791.length; i += 1) {
    i8790.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i8791[i + 0]) );
  }
  i8788.characterInfo = i8790
  request.r(i8789[5], i8789[6], 0, i8788, 'texture')
  i8788.originalFontSize = i8789[7]
  return i8788
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i8794 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i8795 = data
  i8794.index = i8795[0]
  i8794.advance = i8795[1]
  i8794.bearing = i8795[2]
  i8794.glyphWidth = i8795[3]
  i8794.glyphHeight = i8795[4]
  i8794.minX = i8795[5]
  i8794.maxX = i8795[6]
  i8794.minY = i8795[7]
  i8794.maxY = i8795[8]
  i8794.uvBottomLeftX = i8795[9]
  i8794.uvBottomLeftY = i8795[10]
  i8794.uvBottomRightX = i8795[11]
  i8794.uvBottomRightY = i8795[12]
  i8794.uvTopLeftX = i8795[13]
  i8794.uvTopLeftY = i8795[14]
  i8794.uvTopRightX = i8795[15]
  i8794.uvTopRightY = i8795[16]
  return i8794
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController"] = function (request, data, root) {
  var i8796 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController' )
  var i8797 = data
  i8796.name = i8797[0]
  var i8799 = i8797[1]
  var i8798 = []
  for(var i = 0; i < i8799.length; i += 1) {
    i8798.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer', i8799[i + 0]) );
  }
  i8796.layers = i8798
  var i8801 = i8797[2]
  var i8800 = []
  for(var i = 0; i < i8801.length; i += 1) {
    i8800.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter', i8801[i + 0]) );
  }
  i8796.parameters = i8800
  i8796.animationClips = i8797[3]
  i8796.avatarUnsupported = i8797[4]
  return i8796
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer"] = function (request, data, root) {
  var i8804 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer' )
  var i8805 = data
  i8804.name = i8805[0]
  i8804.defaultWeight = i8805[1]
  i8804.blendingMode = i8805[2]
  i8804.avatarMask = i8805[3]
  i8804.syncedLayerIndex = i8805[4]
  i8804.syncedLayerAffectsTiming = !!i8805[5]
  i8804.syncedLayers = i8805[6]
  i8804.stateMachine = request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i8805[7], i8804.stateMachine)
  return i8804
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine"] = function (request, data, root) {
  var i8806 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine' )
  var i8807 = data
  i8806.id = i8807[0]
  i8806.name = i8807[1]
  i8806.path = i8807[2]
  var i8809 = i8807[3]
  var i8808 = []
  for(var i = 0; i < i8809.length; i += 1) {
    i8808.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState', i8809[i + 0]) );
  }
  i8806.states = i8808
  var i8811 = i8807[4]
  var i8810 = []
  for(var i = 0; i < i8811.length; i += 1) {
    i8810.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i8811[i + 0]) );
  }
  i8806.machines = i8810
  var i8813 = i8807[5]
  var i8812 = []
  for(var i = 0; i < i8813.length; i += 1) {
    i8812.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i8813[i + 0]) );
  }
  i8806.entryStateTransitions = i8812
  var i8815 = i8807[6]
  var i8814 = []
  for(var i = 0; i < i8815.length; i += 1) {
    i8814.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i8815[i + 0]) );
  }
  i8806.exitStateTransitions = i8814
  var i8817 = i8807[7]
  var i8816 = []
  for(var i = 0; i < i8817.length; i += 1) {
    i8816.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i8817[i + 0]) );
  }
  i8806.anyStateTransitions = i8816
  i8806.defaultStateId = i8807[8]
  return i8806
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState"] = function (request, data, root) {
  var i8820 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState' )
  var i8821 = data
  i8820.id = i8821[0]
  i8820.name = i8821[1]
  i8820.cycleOffset = i8821[2]
  i8820.cycleOffsetParameter = i8821[3]
  i8820.cycleOffsetParameterActive = !!i8821[4]
  i8820.mirror = !!i8821[5]
  i8820.mirrorParameter = i8821[6]
  i8820.mirrorParameterActive = !!i8821[7]
  i8820.motionId = i8821[8]
  i8820.nameHash = i8821[9]
  i8820.fullPathHash = i8821[10]
  i8820.speed = i8821[11]
  i8820.speedParameter = i8821[12]
  i8820.speedParameterActive = !!i8821[13]
  i8820.tag = i8821[14]
  i8820.tagHash = i8821[15]
  i8820.writeDefaultValues = !!i8821[16]
  var i8823 = i8821[17]
  var i8822 = []
  for(var i = 0; i < i8823.length; i += 2) {
  request.r(i8823[i + 0], i8823[i + 1], 2, i8822, '')
  }
  i8820.behaviours = i8822
  var i8825 = i8821[18]
  var i8824 = []
  for(var i = 0; i < i8825.length; i += 1) {
    i8824.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i8825[i + 0]) );
  }
  i8820.transitions = i8824
  return i8820
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition"] = function (request, data, root) {
  var i8830 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition' )
  var i8831 = data
  i8830.fullPath = i8831[0]
  i8830.canTransitionToSelf = !!i8831[1]
  i8830.duration = i8831[2]
  i8830.exitTime = i8831[3]
  i8830.hasExitTime = !!i8831[4]
  i8830.hasFixedDuration = !!i8831[5]
  i8830.interruptionSource = i8831[6]
  i8830.offset = i8831[7]
  i8830.orderedInterruption = !!i8831[8]
  i8830.destinationStateId = i8831[9]
  i8830.isExit = !!i8831[10]
  i8830.mute = !!i8831[11]
  i8830.solo = !!i8831[12]
  var i8833 = i8831[13]
  var i8832 = []
  for(var i = 0; i < i8833.length; i += 1) {
    i8832.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i8833[i + 0]) );
  }
  i8830.conditions = i8832
  return i8830
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition"] = function (request, data, root) {
  var i8838 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition' )
  var i8839 = data
  i8838.destinationStateId = i8839[0]
  i8838.isExit = !!i8839[1]
  i8838.mute = !!i8839[2]
  i8838.solo = !!i8839[3]
  var i8841 = i8839[4]
  var i8840 = []
  for(var i = 0; i < i8841.length; i += 1) {
    i8840.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i8841[i + 0]) );
  }
  i8838.conditions = i8840
  return i8838
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter"] = function (request, data, root) {
  var i8844 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter' )
  var i8845 = data
  i8844.defaultBool = !!i8845[0]
  i8844.defaultFloat = i8845[1]
  i8844.defaultInt = i8845[2]
  i8844.name = i8845[3]
  i8844.nameHash = i8845[4]
  i8844.type = i8845[5]
  return i8844
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i8846 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i8847 = data
  i8846.name = i8847[0]
  i8846.bytes64 = i8847[1]
  i8846.data = i8847[2]
  return i8846
}

Deserializers["Spine.Unity.SkeletonDataAsset"] = function (request, data, root) {
  var i8848 = root || request.c( 'Spine.Unity.SkeletonDataAsset' )
  var i8849 = data
  var i8851 = i8849[0]
  var i8850 = []
  for(var i = 0; i < i8851.length; i += 2) {
  request.r(i8851[i + 0], i8851[i + 1], 2, i8850, '')
  }
  i8848.atlasAssets = i8850
  i8848.scale = i8849[1]
  request.r(i8849[2], i8849[3], 0, i8848, 'skeletonJSON')
  i8848.isUpgradingBlendModeMaterials = !!i8849[4]
  i8848.blendModeMaterials = request.d('Spine.Unity.BlendModeMaterials', i8849[5], i8848.blendModeMaterials)
  var i8853 = i8849[6]
  var i8852 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.SkeletonDataModifierAsset')))
  for(var i = 0; i < i8853.length; i += 2) {
  request.r(i8853[i + 0], i8853[i + 1], 1, i8852, '')
  }
  i8848.skeletonDataModifiers = i8852
  var i8855 = i8849[7]
  var i8854 = []
  for(var i = 0; i < i8855.length; i += 1) {
    i8854.push( i8855[i + 0] );
  }
  i8848.fromAnimation = i8854
  var i8857 = i8849[8]
  var i8856 = []
  for(var i = 0; i < i8857.length; i += 1) {
    i8856.push( i8857[i + 0] );
  }
  i8848.toAnimation = i8856
  i8848.duration = i8849[9]
  i8848.defaultMix = i8849[10]
  request.r(i8849[11], i8849[12], 0, i8848, 'controller')
  return i8848
}

Deserializers["Spine.Unity.BlendModeMaterials"] = function (request, data, root) {
  var i8860 = root || request.c( 'Spine.Unity.BlendModeMaterials' )
  var i8861 = data
  i8860.applyAdditiveMaterial = !!i8861[0]
  var i8863 = i8861[1]
  var i8862 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i8863.length; i += 1) {
    i8862.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i8863[i + 0]));
  }
  i8860.additiveMaterials = i8862
  var i8865 = i8861[2]
  var i8864 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i8865.length; i += 1) {
    i8864.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i8865[i + 0]));
  }
  i8860.multiplyMaterials = i8864
  var i8867 = i8861[3]
  var i8866 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i8867.length; i += 1) {
    i8866.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i8867[i + 0]));
  }
  i8860.screenMaterials = i8866
  i8860.requiresBlendModeMaterials = !!i8861[4]
  return i8860
}

Deserializers["Spine.Unity.BlendModeMaterials+ReplacementMaterial"] = function (request, data, root) {
  var i8870 = root || request.c( 'Spine.Unity.BlendModeMaterials+ReplacementMaterial' )
  var i8871 = data
  i8870.pageName = i8871[0]
  request.r(i8871[1], i8871[2], 0, i8870, 'material')
  return i8870
}

Deserializers["Spine.Unity.SpineAtlasAsset"] = function (request, data, root) {
  var i8874 = root || request.c( 'Spine.Unity.SpineAtlasAsset' )
  var i8875 = data
  request.r(i8875[0], i8875[1], 0, i8874, 'atlasFile')
  var i8877 = i8875[2]
  var i8876 = []
  for(var i = 0; i < i8877.length; i += 2) {
  request.r(i8877[i + 0], i8877[i + 1], 2, i8876, '')
  }
  i8874.materials = i8876
  i8874.textureLoadingMode = i8875[3]
  request.r(i8875[4], i8875[5], 0, i8874, 'onDemandTextureLoader')
  return i8874
}

Deserializers["SlotDataSO"] = function (request, data, root) {
  var i8878 = root || request.c( 'SlotDataSO' )
  var i8879 = data
  i8878.slotName = i8879[0]
  request.r(i8879[1], i8879[2], 0, i8878, 'leftItemSprite')
  request.r(i8879[3], i8879[4], 0, i8878, 'rightItemSprite')
  return i8878
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i8880 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i8881 = data
  i8880.normalStyle = i8881[0]
  i8880.normalSpacingOffset = i8881[1]
  i8880.boldStyle = i8881[2]
  i8880.boldSpacing = i8881[3]
  i8880.italicStyle = i8881[4]
  i8880.tabSize = i8881[5]
  request.r(i8881[6], i8881[7], 0, i8880, 'atlas')
  i8880.m_SourceFontFileGUID = i8881[8]
  i8880.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i8881[9], i8880.m_CreationSettings)
  request.r(i8881[10], i8881[11], 0, i8880, 'm_SourceFontFile')
  i8880.m_SourceFontFilePath = i8881[12]
  i8880.m_AtlasPopulationMode = i8881[13]
  i8880.InternalDynamicOS = !!i8881[14]
  var i8883 = i8881[15]
  var i8882 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i8883.length; i += 1) {
    i8882.add(request.d('UnityEngine.TextCore.Glyph', i8883[i + 0]));
  }
  i8880.m_GlyphTable = i8882
  var i8885 = i8881[16]
  var i8884 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i8885.length; i += 1) {
    i8884.add(request.d('TMPro.TMP_Character', i8885[i + 0]));
  }
  i8880.m_CharacterTable = i8884
  var i8887 = i8881[17]
  var i8886 = []
  for(var i = 0; i < i8887.length; i += 2) {
  request.r(i8887[i + 0], i8887[i + 1], 2, i8886, '')
  }
  i8880.m_AtlasTextures = i8886
  i8880.m_AtlasTextureIndex = i8881[18]
  i8880.m_IsMultiAtlasTexturesEnabled = !!i8881[19]
  i8880.m_GetFontFeatures = !!i8881[20]
  i8880.m_ClearDynamicDataOnBuild = !!i8881[21]
  i8880.m_AtlasWidth = i8881[22]
  i8880.m_AtlasHeight = i8881[23]
  i8880.m_AtlasPadding = i8881[24]
  i8880.m_AtlasRenderMode = i8881[25]
  var i8889 = i8881[26]
  var i8888 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i8889.length; i += 1) {
    i8888.add(request.d('UnityEngine.TextCore.GlyphRect', i8889[i + 0]));
  }
  i8880.m_UsedGlyphRects = i8888
  var i8891 = i8881[27]
  var i8890 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i8891.length; i += 1) {
    i8890.add(request.d('UnityEngine.TextCore.GlyphRect', i8891[i + 0]));
  }
  i8880.m_FreeGlyphRects = i8890
  i8880.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i8881[28], i8880.m_FontFeatureTable)
  i8880.m_ShouldReimportFontFeatures = !!i8881[29]
  var i8893 = i8881[30]
  var i8892 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i8893.length; i += 2) {
  request.r(i8893[i + 0], i8893[i + 1], 1, i8892, '')
  }
  i8880.m_FallbackFontAssetTable = i8892
  var i8895 = i8881[31]
  var i8894 = []
  for(var i = 0; i < i8895.length; i += 1) {
    i8894.push( request.d('TMPro.TMP_FontWeightPair', i8895[i + 0]) );
  }
  i8880.m_FontWeightTable = i8894
  var i8897 = i8881[32]
  var i8896 = []
  for(var i = 0; i < i8897.length; i += 1) {
    i8896.push( request.d('TMPro.TMP_FontWeightPair', i8897[i + 0]) );
  }
  i8880.fontWeights = i8896
  i8880.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i8881[33], i8880.m_fontInfo)
  var i8899 = i8881[34]
  var i8898 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i8899.length; i += 1) {
    i8898.add(request.d('TMPro.TMP_Glyph', i8899[i + 0]));
  }
  i8880.m_glyphInfoList = i8898
  i8880.m_KerningTable = request.d('TMPro.KerningTable', i8881[35], i8880.m_KerningTable)
  var i8901 = i8881[36]
  var i8900 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i8901.length; i += 2) {
  request.r(i8901[i + 0], i8901[i + 1], 1, i8900, '')
  }
  i8880.fallbackFontAssets = i8900
  i8880.m_Version = i8881[37]
  i8880.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i8881[38], i8880.m_FaceInfo)
  request.r(i8881[39], i8881[40], 0, i8880, 'm_Material')
  return i8880
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i8902 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i8903 = data
  i8902.sourceFontFileName = i8903[0]
  i8902.sourceFontFileGUID = i8903[1]
  i8902.faceIndex = i8903[2]
  i8902.pointSizeSamplingMode = i8903[3]
  i8902.pointSize = i8903[4]
  i8902.padding = i8903[5]
  i8902.paddingMode = i8903[6]
  i8902.packingMode = i8903[7]
  i8902.atlasWidth = i8903[8]
  i8902.atlasHeight = i8903[9]
  i8902.characterSetSelectionMode = i8903[10]
  i8902.characterSequence = i8903[11]
  i8902.referencedFontAssetGUID = i8903[12]
  i8902.referencedTextAssetGUID = i8903[13]
  i8902.fontStyle = i8903[14]
  i8902.fontStyleModifier = i8903[15]
  i8902.renderMode = i8903[16]
  i8902.includeFontFeatures = !!i8903[17]
  return i8902
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i8906 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i8907 = data
  i8906.m_Index = i8907[0]
  i8906.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i8907[1], i8906.m_Metrics)
  i8906.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i8907[2], i8906.m_GlyphRect)
  i8906.m_Scale = i8907[3]
  i8906.m_AtlasIndex = i8907[4]
  i8906.m_ClassDefinitionType = i8907[5]
  return i8906
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i8908 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i8909 = data
  i8908.m_Width = i8909[0]
  i8908.m_Height = i8909[1]
  i8908.m_HorizontalBearingX = i8909[2]
  i8908.m_HorizontalBearingY = i8909[3]
  i8908.m_HorizontalAdvance = i8909[4]
  return i8908
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i8910 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i8911 = data
  i8910.m_X = i8911[0]
  i8910.m_Y = i8911[1]
  i8910.m_Width = i8911[2]
  i8910.m_Height = i8911[3]
  return i8910
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i8914 = root || request.c( 'TMPro.TMP_Character' )
  var i8915 = data
  i8914.m_ElementType = i8915[0]
  i8914.m_Unicode = i8915[1]
  i8914.m_GlyphIndex = i8915[2]
  i8914.m_Scale = i8915[3]
  return i8914
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i8920 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i8921 = data
  var i8923 = i8921[0]
  var i8922 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i8923.length; i += 1) {
    i8922.add(request.d('TMPro.MultipleSubstitutionRecord', i8923[i + 0]));
  }
  i8920.m_MultipleSubstitutionRecords = i8922
  var i8925 = i8921[1]
  var i8924 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i8925.length; i += 1) {
    i8924.add(request.d('TMPro.LigatureSubstitutionRecord', i8925[i + 0]));
  }
  i8920.m_LigatureSubstitutionRecords = i8924
  var i8927 = i8921[2]
  var i8926 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i8927.length; i += 1) {
    i8926.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i8927[i + 0]));
  }
  i8920.m_GlyphPairAdjustmentRecords = i8926
  var i8929 = i8921[3]
  var i8928 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i8929.length; i += 1) {
    i8928.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i8929[i + 0]));
  }
  i8920.m_MarkToBaseAdjustmentRecords = i8928
  var i8931 = i8921[4]
  var i8930 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i8931.length; i += 1) {
    i8930.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i8931[i + 0]));
  }
  i8920.m_MarkToMarkAdjustmentRecords = i8930
  return i8920
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i8934 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i8935 = data
  i8934.m_TargetGlyphID = i8935[0]
  i8934.m_SubstituteGlyphIDs = i8935[1]
  return i8934
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i8938 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i8939 = data
  i8938.m_ComponentGlyphIDs = i8939[0]
  i8938.m_LigatureGlyphID = i8939[1]
  return i8938
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i8942 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i8943 = data
  i8942.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i8943[0], i8942.m_FirstAdjustmentRecord)
  i8942.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i8943[1], i8942.m_SecondAdjustmentRecord)
  i8942.m_FeatureLookupFlags = i8943[2]
  return i8942
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i8944 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i8945 = data
  i8944.m_GlyphIndex = i8945[0]
  i8944.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i8945[1], i8944.m_GlyphValueRecord)
  return i8944
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i8946 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i8947 = data
  i8946.m_XPlacement = i8947[0]
  i8946.m_YPlacement = i8947[1]
  i8946.m_XAdvance = i8947[2]
  i8946.m_YAdvance = i8947[3]
  return i8946
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i8950 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i8951 = data
  i8950.m_BaseGlyphID = i8951[0]
  i8950.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i8951[1], i8950.m_BaseGlyphAnchorPoint)
  i8950.m_MarkGlyphID = i8951[2]
  i8950.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i8951[3], i8950.m_MarkPositionAdjustment)
  return i8950
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i8954 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i8955 = data
  i8954.m_BaseMarkGlyphID = i8955[0]
  i8954.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i8955[1], i8954.m_BaseMarkGlyphAnchorPoint)
  i8954.m_CombiningMarkGlyphID = i8955[2]
  i8954.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i8955[3], i8954.m_CombiningMarkPositionAdjustment)
  return i8954
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i8960 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i8961 = data
  request.r(i8961[0], i8961[1], 0, i8960, 'regularTypeface')
  request.r(i8961[2], i8961[3], 0, i8960, 'italicTypeface')
  return i8960
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i8962 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i8963 = data
  i8962.Name = i8963[0]
  i8962.PointSize = i8963[1]
  i8962.Scale = i8963[2]
  i8962.CharacterCount = i8963[3]
  i8962.LineHeight = i8963[4]
  i8962.Baseline = i8963[5]
  i8962.Ascender = i8963[6]
  i8962.CapHeight = i8963[7]
  i8962.Descender = i8963[8]
  i8962.CenterLine = i8963[9]
  i8962.SuperscriptOffset = i8963[10]
  i8962.SubscriptOffset = i8963[11]
  i8962.SubSize = i8963[12]
  i8962.Underline = i8963[13]
  i8962.UnderlineThickness = i8963[14]
  i8962.strikethrough = i8963[15]
  i8962.strikethroughThickness = i8963[16]
  i8962.TabWidth = i8963[17]
  i8962.Padding = i8963[18]
  i8962.AtlasWidth = i8963[19]
  i8962.AtlasHeight = i8963[20]
  return i8962
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i8966 = root || request.c( 'TMPro.TMP_Glyph' )
  var i8967 = data
  i8966.id = i8967[0]
  i8966.x = i8967[1]
  i8966.y = i8967[2]
  i8966.width = i8967[3]
  i8966.height = i8967[4]
  i8966.xOffset = i8967[5]
  i8966.yOffset = i8967[6]
  i8966.xAdvance = i8967[7]
  i8966.scale = i8967[8]
  return i8966
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i8968 = root || request.c( 'TMPro.KerningTable' )
  var i8969 = data
  var i8971 = i8969[0]
  var i8970 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i8971.length; i += 1) {
    i8970.add(request.d('TMPro.KerningPair', i8971[i + 0]));
  }
  i8968.kerningPairs = i8970
  return i8968
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i8974 = root || request.c( 'TMPro.KerningPair' )
  var i8975 = data
  i8974.xOffset = i8975[0]
  i8974.m_FirstGlyph = i8975[1]
  i8974.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i8975[2], i8974.m_FirstGlyphAdjustments)
  i8974.m_SecondGlyph = i8975[3]
  i8974.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i8975[4], i8974.m_SecondGlyphAdjustments)
  i8974.m_IgnoreSpacingAdjustments = !!i8975[5]
  return i8974
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i8976 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i8977 = data
  i8976.m_FaceIndex = i8977[0]
  i8976.m_FamilyName = i8977[1]
  i8976.m_StyleName = i8977[2]
  i8976.m_PointSize = i8977[3]
  i8976.m_Scale = i8977[4]
  i8976.m_UnitsPerEM = i8977[5]
  i8976.m_LineHeight = i8977[6]
  i8976.m_AscentLine = i8977[7]
  i8976.m_CapLine = i8977[8]
  i8976.m_MeanLine = i8977[9]
  i8976.m_Baseline = i8977[10]
  i8976.m_DescentLine = i8977[11]
  i8976.m_SuperscriptOffset = i8977[12]
  i8976.m_SuperscriptSize = i8977[13]
  i8976.m_SubscriptOffset = i8977[14]
  i8976.m_SubscriptSize = i8977[15]
  i8976.m_UnderlineOffset = i8977[16]
  i8976.m_UnderlineThickness = i8977[17]
  i8976.m_StrikethroughOffset = i8977[18]
  i8976.m_StrikethroughThickness = i8977[19]
  i8976.m_TabWidth = i8977[20]
  return i8976
}

Deserializers["EquipmentSetData"] = function (request, data, root) {
  var i8978 = root || request.c( 'EquipmentSetData' )
  var i8979 = data
  request.r(i8979[0], i8979[1], 0, i8978, 'targetSkeletonDataAsset')
  var i8981 = i8979[2]
  var i8980 = new (System.Collections.Generic.List$1(Bridge.ns('System.String')))
  for(var i = 0; i < i8981.length; i += 1) {
    i8980.add(i8981[i + 0]);
  }
  i8978.skinNames = i8980
  return i8978
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i8982 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i8983 = data
  i8982.useSafeMode = !!i8983[0]
  i8982.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i8983[1], i8982.safeModeOptions)
  i8982.timeScale = i8983[2]
  i8982.unscaledTimeScale = i8983[3]
  i8982.useSmoothDeltaTime = !!i8983[4]
  i8982.maxSmoothUnscaledTime = i8983[5]
  i8982.rewindCallbackMode = i8983[6]
  i8982.showUnityEditorReport = !!i8983[7]
  i8982.logBehaviour = i8983[8]
  i8982.drawGizmos = !!i8983[9]
  i8982.defaultRecyclable = !!i8983[10]
  i8982.defaultAutoPlay = i8983[11]
  i8982.defaultUpdateType = i8983[12]
  i8982.defaultTimeScaleIndependent = !!i8983[13]
  i8982.defaultEaseType = i8983[14]
  i8982.defaultEaseOvershootOrAmplitude = i8983[15]
  i8982.defaultEasePeriod = i8983[16]
  i8982.defaultAutoKill = !!i8983[17]
  i8982.defaultLoopType = i8983[18]
  i8982.debugMode = !!i8983[19]
  i8982.debugStoreTargetId = !!i8983[20]
  i8982.showPreviewPanel = !!i8983[21]
  i8982.storeSettingsLocation = i8983[22]
  i8982.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i8983[23], i8982.modules)
  i8982.createASMDEF = !!i8983[24]
  i8982.showPlayingTweens = !!i8983[25]
  i8982.showPausedTweens = !!i8983[26]
  return i8982
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i8984 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i8985 = data
  i8984.logBehaviour = i8985[0]
  i8984.nestedTweenFailureBehaviour = i8985[1]
  return i8984
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i8986 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i8987 = data
  i8986.showPanel = !!i8987[0]
  i8986.audioEnabled = !!i8987[1]
  i8986.physicsEnabled = !!i8987[2]
  i8986.physics2DEnabled = !!i8987[3]
  i8986.spriteEnabled = !!i8987[4]
  i8986.uiEnabled = !!i8987[5]
  i8986.uiToolkitEnabled = !!i8987[6]
  i8986.textMeshProEnabled = !!i8987[7]
  i8986.tk2DEnabled = !!i8987[8]
  i8986.deAudioEnabled = !!i8987[9]
  i8986.deUnityExtendedEnabled = !!i8987[10]
  i8986.epoOutlineEnabled = !!i8987[11]
  return i8986
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i8988 = root || request.c( 'TMPro.TMP_Settings' )
  var i8989 = data
  i8988.assetVersion = i8989[0]
  i8988.m_TextWrappingMode = i8989[1]
  i8988.m_enableKerning = !!i8989[2]
  var i8991 = i8989[3]
  var i8990 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i8991.length; i += 1) {
    i8990.add(i8991[i + 0]);
  }
  i8988.m_ActiveFontFeatures = i8990
  i8988.m_enableExtraPadding = !!i8989[4]
  i8988.m_enableTintAllSprites = !!i8989[5]
  i8988.m_enableParseEscapeCharacters = !!i8989[6]
  i8988.m_EnableRaycastTarget = !!i8989[7]
  i8988.m_GetFontFeaturesAtRuntime = !!i8989[8]
  i8988.m_missingGlyphCharacter = i8989[9]
  i8988.m_ClearDynamicDataOnBuild = !!i8989[10]
  i8988.m_warningsDisabled = !!i8989[11]
  request.r(i8989[12], i8989[13], 0, i8988, 'm_defaultFontAsset')
  i8988.m_defaultFontAssetPath = i8989[14]
  i8988.m_defaultFontSize = i8989[15]
  i8988.m_defaultAutoSizeMinRatio = i8989[16]
  i8988.m_defaultAutoSizeMaxRatio = i8989[17]
  i8988.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i8989[18], i8989[19] )
  i8988.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i8989[20], i8989[21] )
  i8988.m_autoSizeTextContainer = !!i8989[22]
  i8988.m_IsTextObjectScaleStatic = !!i8989[23]
  var i8993 = i8989[24]
  var i8992 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i8993.length; i += 2) {
  request.r(i8993[i + 0], i8993[i + 1], 1, i8992, '')
  }
  i8988.m_fallbackFontAssets = i8992
  i8988.m_matchMaterialPreset = !!i8989[25]
  i8988.m_HideSubTextObjects = !!i8989[26]
  request.r(i8989[27], i8989[28], 0, i8988, 'm_defaultSpriteAsset')
  i8988.m_defaultSpriteAssetPath = i8989[29]
  i8988.m_enableEmojiSupport = !!i8989[30]
  i8988.m_MissingCharacterSpriteUnicode = i8989[31]
  var i8995 = i8989[32]
  var i8994 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i8995.length; i += 2) {
  request.r(i8995[i + 0], i8995[i + 1], 1, i8994, '')
  }
  i8988.m_EmojiFallbackTextAssets = i8994
  i8988.m_defaultColorGradientPresetsPath = i8989[33]
  request.r(i8989[34], i8989[35], 0, i8988, 'm_defaultStyleSheet')
  i8988.m_StyleSheetsResourcePath = i8989[36]
  request.r(i8989[37], i8989[38], 0, i8988, 'm_leadingCharacters')
  request.r(i8989[39], i8989[40], 0, i8988, 'm_followingCharacters')
  i8988.m_UseModernHangulLineBreakingRules = !!i8989[41]
  return i8988
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i8998 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i8999 = data
  request.r(i8999[0], i8999[1], 0, i8998, 'spriteSheet')
  var i9001 = i8999[2]
  var i9000 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i9001.length; i += 1) {
    i9000.add(request.d('TMPro.TMP_Sprite', i9001[i + 0]));
  }
  i8998.spriteInfoList = i9000
  var i9003 = i8999[3]
  var i9002 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i9003.length; i += 2) {
  request.r(i9003[i + 0], i9003[i + 1], 1, i9002, '')
  }
  i8998.fallbackSpriteAssets = i9002
  var i9005 = i8999[4]
  var i9004 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i9005.length; i += 1) {
    i9004.add(request.d('TMPro.TMP_SpriteCharacter', i9005[i + 0]));
  }
  i8998.m_SpriteCharacterTable = i9004
  var i9007 = i8999[5]
  var i9006 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i9007.length; i += 1) {
    i9006.add(request.d('TMPro.TMP_SpriteGlyph', i9007[i + 0]));
  }
  i8998.m_GlyphTable = i9006
  i8998.m_Version = i8999[6]
  i8998.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i8999[7], i8998.m_FaceInfo)
  request.r(i8999[8], i8999[9], 0, i8998, 'm_Material')
  return i8998
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i9010 = root || request.c( 'TMPro.TMP_Sprite' )
  var i9011 = data
  i9010.name = i9011[0]
  i9010.hashCode = i9011[1]
  i9010.unicode = i9011[2]
  i9010.pivot = new pc.Vec2( i9011[3], i9011[4] )
  request.r(i9011[5], i9011[6], 0, i9010, 'sprite')
  i9010.id = i9011[7]
  i9010.x = i9011[8]
  i9010.y = i9011[9]
  i9010.width = i9011[10]
  i9010.height = i9011[11]
  i9010.xOffset = i9011[12]
  i9010.yOffset = i9011[13]
  i9010.xAdvance = i9011[14]
  i9010.scale = i9011[15]
  return i9010
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i9016 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i9017 = data
  i9016.m_Name = i9017[0]
  i9016.m_ElementType = i9017[1]
  i9016.m_Unicode = i9017[2]
  i9016.m_GlyphIndex = i9017[3]
  i9016.m_Scale = i9017[4]
  return i9016
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i9020 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i9021 = data
  request.r(i9021[0], i9021[1], 0, i9020, 'sprite')
  i9020.m_Index = i9021[2]
  i9020.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i9021[3], i9020.m_Metrics)
  i9020.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i9021[4], i9020.m_GlyphRect)
  i9020.m_Scale = i9021[5]
  i9020.m_AtlasIndex = i9021[6]
  i9020.m_ClassDefinitionType = i9021[7]
  return i9020
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i9022 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i9023 = data
  var i9025 = i9023[0]
  var i9024 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i9025.length; i += 1) {
    i9024.add(request.d('TMPro.TMP_Style', i9025[i + 0]));
  }
  i9022.m_StyleList = i9024
  return i9022
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i9028 = root || request.c( 'TMPro.TMP_Style' )
  var i9029 = data
  i9028.m_Name = i9029[0]
  i9028.m_HashCode = i9029[1]
  i9028.m_OpeningDefinition = i9029[2]
  i9028.m_ClosingDefinition = i9029[3]
  i9028.m_OpeningTagArray = i9029[4]
  i9028.m_ClosingTagArray = i9029[5]
  return i9028
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i9030 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i9031 = data
  var i9033 = i9031[0]
  var i9032 = []
  for(var i = 0; i < i9033.length; i += 1) {
    i9032.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i9033[i + 0]) );
  }
  i9030.files = i9032
  i9030.componentToPrefabIds = i9031[1]
  return i9030
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i9036 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i9037 = data
  i9036.path = i9037[0]
  request.r(i9037[1], i9037[2], 0, i9036, 'unityObject')
  return i9036
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i9038 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i9039 = data
  var i9041 = i9039[0]
  var i9040 = []
  for(var i = 0; i < i9041.length; i += 1) {
    i9040.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i9041[i + 0]) );
  }
  i9038.scriptsExecutionOrder = i9040
  var i9043 = i9039[1]
  var i9042 = []
  for(var i = 0; i < i9043.length; i += 1) {
    i9042.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i9043[i + 0]) );
  }
  i9038.sortingLayers = i9042
  var i9045 = i9039[2]
  var i9044 = []
  for(var i = 0; i < i9045.length; i += 1) {
    i9044.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i9045[i + 0]) );
  }
  i9038.cullingLayers = i9044
  i9038.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i9039[3], i9038.timeSettings)
  i9038.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i9039[4], i9038.physicsSettings)
  i9038.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i9039[5], i9038.physics2DSettings)
  i9038.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i9039[6], i9038.qualitySettings)
  i9038.enableRealtimeShadows = !!i9039[7]
  i9038.enableAutoInstancing = !!i9039[8]
  i9038.enableStaticBatching = !!i9039[9]
  i9038.enableDynamicBatching = !!i9039[10]
  i9038.lightmapEncodingQuality = i9039[11]
  i9038.desiredColorSpace = i9039[12]
  var i9047 = i9039[13]
  var i9046 = []
  for(var i = 0; i < i9047.length; i += 1) {
    i9046.push( i9047[i + 0] );
  }
  i9038.allTags = i9046
  return i9038
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i9050 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i9051 = data
  i9050.name = i9051[0]
  i9050.value = i9051[1]
  return i9050
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i9054 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i9055 = data
  i9054.id = i9055[0]
  i9054.name = i9055[1]
  i9054.value = i9055[2]
  return i9054
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i9058 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i9059 = data
  i9058.id = i9059[0]
  i9058.name = i9059[1]
  return i9058
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i9060 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i9061 = data
  i9060.fixedDeltaTime = i9061[0]
  i9060.maximumDeltaTime = i9061[1]
  i9060.timeScale = i9061[2]
  i9060.maximumParticleTimestep = i9061[3]
  return i9060
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i9062 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i9063 = data
  i9062.gravity = new pc.Vec3( i9063[0], i9063[1], i9063[2] )
  i9062.defaultSolverIterations = i9063[3]
  i9062.bounceThreshold = i9063[4]
  i9062.autoSyncTransforms = !!i9063[5]
  i9062.autoSimulation = !!i9063[6]
  var i9065 = i9063[7]
  var i9064 = []
  for(var i = 0; i < i9065.length; i += 1) {
    i9064.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i9065[i + 0]) );
  }
  i9062.collisionMatrix = i9064
  return i9062
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i9068 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i9069 = data
  i9068.enabled = !!i9069[0]
  i9068.layerId = i9069[1]
  i9068.otherLayerId = i9069[2]
  return i9068
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i9070 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i9071 = data
  request.r(i9071[0], i9071[1], 0, i9070, 'material')
  i9070.gravity = new pc.Vec2( i9071[2], i9071[3] )
  i9070.positionIterations = i9071[4]
  i9070.velocityIterations = i9071[5]
  i9070.velocityThreshold = i9071[6]
  i9070.maxLinearCorrection = i9071[7]
  i9070.maxAngularCorrection = i9071[8]
  i9070.maxTranslationSpeed = i9071[9]
  i9070.maxRotationSpeed = i9071[10]
  i9070.baumgarteScale = i9071[11]
  i9070.baumgarteTOIScale = i9071[12]
  i9070.timeToSleep = i9071[13]
  i9070.linearSleepTolerance = i9071[14]
  i9070.angularSleepTolerance = i9071[15]
  i9070.defaultContactOffset = i9071[16]
  i9070.autoSimulation = !!i9071[17]
  i9070.queriesHitTriggers = !!i9071[18]
  i9070.queriesStartInColliders = !!i9071[19]
  i9070.callbacksOnDisable = !!i9071[20]
  i9070.reuseCollisionCallbacks = !!i9071[21]
  i9070.autoSyncTransforms = !!i9071[22]
  var i9073 = i9071[23]
  var i9072 = []
  for(var i = 0; i < i9073.length; i += 1) {
    i9072.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i9073[i + 0]) );
  }
  i9070.collisionMatrix = i9072
  return i9070
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i9076 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i9077 = data
  i9076.enabled = !!i9077[0]
  i9076.layerId = i9077[1]
  i9076.otherLayerId = i9077[2]
  return i9076
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i9078 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i9079 = data
  var i9081 = i9079[0]
  var i9080 = []
  for(var i = 0; i < i9081.length; i += 1) {
    i9080.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i9081[i + 0]) );
  }
  i9078.qualityLevels = i9080
  var i9083 = i9079[1]
  var i9082 = []
  for(var i = 0; i < i9083.length; i += 1) {
    i9082.push( i9083[i + 0] );
  }
  i9078.names = i9082
  i9078.shadows = i9079[2]
  i9078.anisotropicFiltering = i9079[3]
  i9078.antiAliasing = i9079[4]
  i9078.lodBias = i9079[5]
  i9078.shadowCascades = i9079[6]
  i9078.shadowDistance = i9079[7]
  i9078.shadowmaskMode = i9079[8]
  i9078.shadowProjection = i9079[9]
  i9078.shadowResolution = i9079[10]
  i9078.softParticles = !!i9079[11]
  i9078.softVegetation = !!i9079[12]
  i9078.activeColorSpace = i9079[13]
  i9078.desiredColorSpace = i9079[14]
  i9078.masterTextureLimit = i9079[15]
  i9078.maxQueuedFrames = i9079[16]
  i9078.particleRaycastBudget = i9079[17]
  i9078.pixelLightCount = i9079[18]
  i9078.realtimeReflectionProbes = !!i9079[19]
  i9078.shadowCascade2Split = i9079[20]
  i9078.shadowCascade4Split = new pc.Vec3( i9079[21], i9079[22], i9079[23] )
  i9078.streamingMipmapsActive = !!i9079[24]
  i9078.vSyncCount = i9079[25]
  i9078.asyncUploadBufferSize = i9079[26]
  i9078.asyncUploadTimeSlice = i9079[27]
  i9078.billboardsFaceCameraPosition = !!i9079[28]
  i9078.shadowNearPlaneOffset = i9079[29]
  i9078.streamingMipmapsMemoryBudget = i9079[30]
  i9078.maximumLODLevel = i9079[31]
  i9078.streamingMipmapsAddAllCameras = !!i9079[32]
  i9078.streamingMipmapsMaxLevelReduction = i9079[33]
  i9078.streamingMipmapsRenderersPerFrame = i9079[34]
  i9078.resolutionScalingFixedDPIFactor = i9079[35]
  i9078.streamingMipmapsMaxFileIORequests = i9079[36]
  i9078.currentQualityLevel = i9079[37]
  return i9078
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i9088 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i9089 = data
  i9088.weight = i9089[0]
  i9088.vertices = i9089[1]
  i9088.normals = i9089[2]
  i9088.tangents = i9089[3]
  return i9088
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition"] = function (request, data, root) {
  var i9092 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition' )
  var i9093 = data
  i9092.mode = i9093[0]
  i9092.parameter = i9093[1]
  i9092.threshold = i9093[2]
  return i9092
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i9094 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i9095 = data
  i9094.m_XCoordinate = i9095[0]
  i9094.m_YCoordinate = i9095[1]
  return i9094
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i9096 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i9097 = data
  i9096.m_XPositionAdjustment = i9097[0]
  i9096.m_YPositionAdjustment = i9097[1]
  return i9096
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i9098 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i9099 = data
  i9098.xPlacement = i9099[0]
  i9098.yPlacement = i9099[1]
  i9098.xAdvance = i9099[2]
  i9098.yAdvance = i9099[3]
  return i9098
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.Animator":{"animatorController":0,"avatar":2,"updateMode":4,"hasTransformHierarchy":5,"applyRootMotion":6,"humanBones":7,"enabled":8},"Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer":{"color":0,"sprite":4,"flipX":6,"flipY":7,"drawMode":8,"size":9,"tileMode":11,"adaptiveModeThreshold":12,"maskInteraction":13,"spriteSortPoint":14,"enabled":15,"sharedMaterial":16,"sharedMaterials":18,"receiveShadows":19,"shadowCastingMode":20,"sortingLayerID":21,"sortingOrder":22,"lightmapIndex":23,"lightmapSceneIndex":24,"lightmapScaleOffset":25,"lightProbeUsage":29,"reflectionProbeUsage":30},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"referenceAmbientProbe":36,"useReferenceAmbientProbe":37,"customReflection":38,"defaultReflection":40,"defaultReflectionMode":42,"defaultReflectionResolution":43,"sunLightObjectId":44,"pixelLightCount":45,"defaultReflectionHDR":46,"hasLightDataAsset":47,"hasManualGenerate":48},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController":{"name":0,"layers":1,"parameters":2,"animationClips":3,"avatarUnsupported":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer":{"name":0,"defaultWeight":1,"blendingMode":2,"avatarMask":3,"syncedLayerIndex":4,"syncedLayerAffectsTiming":5,"syncedLayers":6,"stateMachine":7},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine":{"id":0,"name":1,"path":2,"states":3,"machines":4,"entryStateTransitions":5,"exitStateTransitions":6,"anyStateTransitions":7,"defaultStateId":8},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState":{"id":0,"name":1,"cycleOffset":2,"cycleOffsetParameter":3,"cycleOffsetParameterActive":4,"mirror":5,"mirrorParameter":6,"mirrorParameterActive":7,"motionId":8,"nameHash":9,"fullPathHash":10,"speed":11,"speedParameter":12,"speedParameterActive":13,"tag":14,"tagHash":15,"writeDefaultValues":16,"behaviours":17,"transitions":18},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition":{"fullPath":0,"canTransitionToSelf":1,"duration":2,"exitTime":3,"hasExitTime":4,"hasFixedDuration":5,"interruptionSource":6,"offset":7,"orderedInterruption":8,"destinationStateId":9,"isExit":10,"mute":11,"solo":12,"conditions":13},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition":{"destinationStateId":0,"isExit":1,"mute":2,"solo":3,"conditions":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter":{"defaultBool":0,"defaultFloat":1,"defaultInt":2,"name":3,"nameHash":4,"type":5},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"lightmapEncodingQuality":11,"desiredColorSpace":12,"allTags":13},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition":{"mode":0,"parameter":1,"threshold":2}}

Deserializers.requiredComponents = {"47":[48],"49":[48],"50":[48],"51":[48],"52":[48],"53":[48],"54":[55],"56":[8],"57":[58],"59":[58],"60":[58],"61":[58],"62":[58],"63":[58],"64":[65],"66":[65],"67":[65],"68":[65],"69":[65],"70":[65],"71":[65],"72":[65],"73":[65],"74":[65],"75":[65],"76":[65],"77":[65],"78":[8],"79":[32],"80":[81],"82":[81],"83":[34],"11":[8],"84":[85],"86":[34],"87":[88,34],"33":[32],"89":[88,34],"90":[3,32],"91":[32],"92":[32,30],"93":[58],"94":[65],"95":[85],"96":[97],"98":[5],"99":[8],"100":[101],"102":[38],"103":[83],"104":[34],"36":[32,34],"105":[34,88],"106":[34],"107":[88,34],"108":[32],"109":[88,34],"110":[34],"111":[112],"113":[112],"114":[112],"115":[34],"116":[34],"117":[83],"118":[88,34],"119":[34],"120":[83],"121":[34],"122":[34],"123":[34],"124":[34],"125":[34],"126":[34],"127":[34],"128":[34],"129":[34],"130":[88,34],"131":[34],"132":[34],"133":[34],"134":[34],"135":[88,34],"136":[34],"137":[38],"138":[38],"39":[38],"139":[38],"140":[8],"141":[8]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Transform","UnityEngine.Animator","UnityEditor.Animations.AnimatorController","UnityEngine.SpriteRenderer","UnityEngine.Sprite","UnityEngine.Material","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.MonoBehaviour","AutoCameraFit","CharacterManager","Character","EquipmentSetData","Spine.Unity.SkeletonDataAsset","GameManager","SlotManager","SlotSetup","UnityEngine.GameObject","Ply_Pool","Ply_SoundManager","UnityEngine.AudioClip","UnityEngine.AudioSource","ProgressTrackingManager","UnityEngine.CapsuleCollider","BalloonController","BalloonActionTrigger","SlotDataSO","ScreenHeightPositionAnchor","UnityEngine.MeshFilter","UnityEngine.Mesh","UnityEngine.MeshRenderer","Spine.Unity.SkeletonAnimation","UnityEngine.RectTransform","UnityEngine.EventSystems.UIBehaviour","TMPro.TextMeshPro","TMPro.TMP_FontAsset","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","Spine.Unity.SpineAtlasAsset","UnityEngine.TextAsset","UnityEngine.Font","DG.Tweening.Core.DOTweenSettings","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.Canvas","Spine.Unity.EditorSkeletonPlayer","Spine.Unity.ISkeletonAnimation","Spine.Unity.BoneFollowerGraphic","Spine.Unity.SkeletonSubmeshGraphic","UnityEngine.CanvasRenderer","Spine.Unity.SkeletonGraphic","Spine.Unity.SkeletonMecanim","Spine.Unity.SkeletonRenderer","Spine.Unity.SkeletonPartsRenderer","Spine.Unity.FollowLocationRigidbody","Spine.Unity.FollowLocationRigidbody2D","Spine.Unity.SkeletonUtility","Spine.Unity.SkeletonUtilityConstraint","Spine.Unity.SkeletonUtilityBone","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","UnityEngine.InputSystem.UI.InputSystemUIInputModule","UnityEngine.InputSystem.UI.TrackedDeviceRaycaster","TMPro.TextContainer","TMPro.TextMeshProUGUI","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.GraphicRaycaster","UnityEngine.UI.Image","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.CanvasScaler","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.ScrollRect","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.38f1";

Deserializers.productName = "PLY_LeftOrRight";

Deserializers.lunaInitializationTime = "07/24/2026 10:13:04";

Deserializers.lunaDaysRunning = "3.0";

Deserializers.lunaVersion = "7.1.0";

Deserializers.lunaSHA = "cf93782349542fe0b84ad13951a26809f8419628";

Deserializers.creativeName = "LeftOrRight_Ply2";

Deserializers.lunaAppID = "33393";

Deserializers.projectId = "a6751afac85ec2744a912b2a685dda8d";

Deserializers.packagesInfo = "com.unity.inputsystem: 1.13.0\ncom.unity.timeline: 1.8.7\ncom.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "True";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "True";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "1915";

Deserializers.runtimeAnalysisExcludedMethodsCount = "5422";

Deserializers.runtimeAnalysisExcludedModules = "physics2d, particle-system";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isReferenceAmbientProbeBaked = "False";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "StandaloneWindows64";

Deserializers.applicationIdentifier = "com.DefaultCompany.PLY-LeftOrRight";

Deserializers.disableAntiAliasing = false;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = false;

Deserializers.buildID = "726526ed-ab05-4d06-b7c0-b6592a5dc0d4";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","Services","Core","Internal","UnityServicesInitializer","EnableServicesInitializationAsync"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["DG","Tweening","DOTween","RuntimeOnLoad"],["Sirenix","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","UnitySerializationInitializer","InitializeRuntime"],["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["Unity","Services","Core","Registration","CorePackageInitializer","InitializeOnLoad"],["Unity","Services","Core","Internal","TaskAsyncOperation","SetScheduler"],["Unity","Services","Core","Environments","Client","Scheduler","EngineStateHelper","Init"],["Unity","Services","Core","Environments","Client","Scheduler","ThreadHelper","Init"],["Ua2CoreInitializeCallback","Register"],["UnityEngine","InputSystem","InputSystem","RunInitialUpdate"],["Unity","AI","Navigation","NavMeshLink","ClearTrackedList"],["Unity","AI","Navigation","NavMeshSurface","ClearNavMeshSurfaces"],["Unity","AI","Navigation","NavMeshModifierVolume","ClearNavMeshModifiers"],["Unity","AI","Navigation","NavMeshModifier","ClearNavMeshModifiers"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["Unity","Services","Core","Internal","UnityServicesInitializer","CreateStaticInstance"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[["Unity","Services","Core","Environments","Client","Http","JsonHelpers","RegisterTypesForAOT"]],[["Unity","Services","Core","UnityThreadUtils","CaptureUnityThreadInfo"],["UnityEngine","InputSystem","Plugins","InputForUI","InputSystemProvider","Bootstrap"],["UnityEngine","InputSystem","InputSystem","RunInitializeInPlayer"],["Spine","Unity","AttachmentTools","AtlasUtilities","Init"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

