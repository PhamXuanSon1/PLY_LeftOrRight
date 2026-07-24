var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i630 = root || request.c( 'UnityEngine.JointSpring' )
  var i631 = data
  i630.spring = i631[0]
  i630.damper = i631[1]
  i630.targetPosition = i631[2]
  return i630
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i632 = root || request.c( 'UnityEngine.JointMotor' )
  var i633 = data
  i632.m_TargetVelocity = i633[0]
  i632.m_Force = i633[1]
  i632.m_FreeSpin = i633[2]
  return i632
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i634 = root || request.c( 'UnityEngine.JointLimits' )
  var i635 = data
  i634.m_Min = i635[0]
  i634.m_Max = i635[1]
  i634.m_Bounciness = i635[2]
  i634.m_BounceMinVelocity = i635[3]
  i634.m_ContactDistance = i635[4]
  i634.minBounce = i635[5]
  i634.maxBounce = i635[6]
  return i634
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i636 = root || request.c( 'UnityEngine.JointDrive' )
  var i637 = data
  i636.m_PositionSpring = i637[0]
  i636.m_PositionDamper = i637[1]
  i636.m_MaximumForce = i637[2]
  i636.m_UseAcceleration = i637[3]
  return i636
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i638 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i639 = data
  i638.m_Spring = i639[0]
  i638.m_Damper = i639[1]
  return i638
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i640 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i641 = data
  i640.m_Limit = i641[0]
  i640.m_Bounciness = i641[1]
  i640.m_ContactDistance = i641[2]
  return i640
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i642 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i643 = data
  i642.m_ExtremumSlip = i643[0]
  i642.m_ExtremumValue = i643[1]
  i642.m_AsymptoteSlip = i643[2]
  i642.m_AsymptoteValue = i643[3]
  i642.m_Stiffness = i643[4]
  return i642
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i644 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i645 = data
  i644.m_LowerAngle = i645[0]
  i644.m_UpperAngle = i645[1]
  return i644
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i646 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i647 = data
  i646.m_MotorSpeed = i647[0]
  i646.m_MaximumMotorTorque = i647[1]
  return i646
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i648 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i649 = data
  i648.m_DampingRatio = i649[0]
  i648.m_Frequency = i649[1]
  i648.m_Angle = i649[2]
  return i648
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i650 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i651 = data
  i650.m_LowerTranslation = i651[0]
  i650.m_UpperTranslation = i651[1]
  return i650
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i652 = root || new pc.UnityMaterial()
  var i653 = data
  i652.name = i653[0]
  request.r(i653[1], i653[2], 0, i652, 'shader')
  i652.renderQueue = i653[3]
  i652.enableInstancing = !!i653[4]
  var i655 = i653[5]
  var i654 = []
  for(var i = 0; i < i655.length; i += 1) {
    i654.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i655[i + 0]) );
  }
  i652.floatParameters = i654
  var i657 = i653[6]
  var i656 = []
  for(var i = 0; i < i657.length; i += 1) {
    i656.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i657[i + 0]) );
  }
  i652.colorParameters = i656
  var i659 = i653[7]
  var i658 = []
  for(var i = 0; i < i659.length; i += 1) {
    i658.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i659[i + 0]) );
  }
  i652.vectorParameters = i658
  var i661 = i653[8]
  var i660 = []
  for(var i = 0; i < i661.length; i += 1) {
    i660.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i661[i + 0]) );
  }
  i652.textureParameters = i660
  var i663 = i653[9]
  var i662 = []
  for(var i = 0; i < i663.length; i += 1) {
    i662.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i663[i + 0]) );
  }
  i652.materialFlags = i662
  return i652
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i666 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i667 = data
  i666.name = i667[0]
  i666.value = i667[1]
  return i666
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i670 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i671 = data
  i670.name = i671[0]
  i670.value = new pc.Color(i671[1], i671[2], i671[3], i671[4])
  return i670
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i674 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i675 = data
  i674.name = i675[0]
  i674.value = new pc.Vec4( i675[1], i675[2], i675[3], i675[4] )
  return i674
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i678 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i679 = data
  i678.name = i679[0]
  request.r(i679[1], i679[2], 0, i678, 'value')
  return i678
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i682 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i683 = data
  i682.name = i683[0]
  i682.enabled = !!i683[1]
  return i682
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i684 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i685 = data
  i684.name = i685[0]
  i684.width = i685[1]
  i684.height = i685[2]
  i684.mipmapCount = i685[3]
  i684.anisoLevel = i685[4]
  i684.filterMode = i685[5]
  i684.hdr = !!i685[6]
  i684.format = i685[7]
  i684.wrapMode = i685[8]
  i684.alphaIsTransparency = !!i685[9]
  i684.alphaSource = i685[10]
  i684.graphicsFormat = i685[11]
  i684.sRGBTexture = !!i685[12]
  i684.desiredColorSpace = i685[13]
  i684.wrapU = i685[14]
  i684.wrapV = i685[15]
  return i684
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i686 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i687 = data
  i686.name = i687[0]
  i686.halfPrecision = !!i687[1]
  i686.useSimplification = !!i687[2]
  i686.useUInt32IndexFormat = !!i687[3]
  i686.vertexCount = i687[4]
  i686.aabb = i687[5]
  var i689 = i687[6]
  var i688 = []
  for(var i = 0; i < i689.length; i += 1) {
    i688.push( !!i689[i + 0] );
  }
  i686.streams = i688
  i686.vertices = i687[7]
  var i691 = i687[8]
  var i690 = []
  for(var i = 0; i < i691.length; i += 1) {
    i690.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i691[i + 0]) );
  }
  i686.subMeshes = i690
  var i693 = i687[9]
  var i692 = []
  for(var i = 0; i < i693.length; i += 16) {
    i692.push( new pc.Mat4().setData(i693[i + 0], i693[i + 1], i693[i + 2], i693[i + 3],  i693[i + 4], i693[i + 5], i693[i + 6], i693[i + 7],  i693[i + 8], i693[i + 9], i693[i + 10], i693[i + 11],  i693[i + 12], i693[i + 13], i693[i + 14], i693[i + 15]) );
  }
  i686.bindposes = i692
  var i695 = i687[10]
  var i694 = []
  for(var i = 0; i < i695.length; i += 1) {
    i694.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i695[i + 0]) );
  }
  i686.blendShapes = i694
  return i686
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i700 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i701 = data
  i700.triangles = i701[0]
  return i700
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i706 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i707 = data
  i706.name = i707[0]
  var i709 = i707[1]
  var i708 = []
  for(var i = 0; i < i709.length; i += 1) {
    i708.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i709[i + 0]) );
  }
  i706.frames = i708
  return i706
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i710 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i711 = data
  i710.name = i711[0]
  i710.index = i711[1]
  i710.startup = !!i711[2]
  return i710
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i712 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i713 = data
  i712.aspect = i713[0]
  i712.orthographic = !!i713[1]
  i712.orthographicSize = i713[2]
  i712.backgroundColor = new pc.Color(i713[3], i713[4], i713[5], i713[6])
  i712.nearClipPlane = i713[7]
  i712.farClipPlane = i713[8]
  i712.fieldOfView = i713[9]
  i712.depth = i713[10]
  i712.clearFlags = i713[11]
  i712.cullingMask = i713[12]
  i712.rect = i713[13]
  request.r(i713[14], i713[15], 0, i712, 'targetTexture')
  i712.usePhysicalProperties = !!i713[16]
  i712.focalLength = i713[17]
  i712.sensorSize = new pc.Vec2( i713[18], i713[19] )
  i712.lensShift = new pc.Vec2( i713[20], i713[21] )
  i712.gateFit = i713[22]
  i712.commandBufferCount = i713[23]
  i712.cameraType = i713[24]
  i712.enabled = !!i713[25]
  return i712
}

Deserializers["AutoCameraFit"] = function (request, data, root) {
  var i714 = root || request.c( 'AutoCameraFit' )
  var i715 = data
  request.r(i715[0], i715[1], 0, i714, 'tallScreenObject')
  i714.tallScreenRatioThreshold = i715[2]
  i714.tallScreenYOffset = i715[3]
  request.r(i715[4], i715[5], 0, i714, 'canvasBtn')
  request.r(i715[6], i715[7], 0, i714, 'targetArea')
  i714.paddingLandscape = i715[8]
  i714.paddingPortrait = i715[9]
  i714.extraPaddingSmallScreen = i715[10]
  i714.smallScreenThreshold = i715[11]
  i714.autoUpdateOnResize = !!i715[12]
  i714.adjustInEditMode = !!i715[13]
  return i714
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i716 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i717 = data
  i716.name = i717[0]
  i716.tagId = i717[1]
  i716.enabled = !!i717[2]
  i716.isStatic = !!i717[3]
  i716.layer = i717[4]
  return i716
}

Deserializers["CharacterManager"] = function (request, data, root) {
  var i718 = root || request.c( 'CharacterManager' )
  var i719 = data
  var i721 = i719[0]
  var i720 = new (System.Collections.Generic.List$1(Bridge.ns('CharacterEquipmentSetup')))
  for(var i = 0; i < i721.length; i += 1) {
    i720.add(request.d('CharacterEquipmentSetup', i721[i + 0]));
  }
  i718.characterSetups = i720
  request.r(i719[1], i719[2], 0, i718, 'character1')
  request.r(i719[3], i719[4], 0, i718, 'targetTestCharacter')
  request.r(i719[5], i719[6], 0, i718, 'testEquipmentDataAsset')
  var i723 = i719[7]
  var i722 = new (System.Collections.Generic.List$1(Bridge.ns('SkinToggleEntry')))
  for(var i = 0; i < i723.length; i += 1) {
    i722.add(request.d('SkinToggleEntry', i723[i + 0]));
  }
  i718.mySkinSet = i722
  var i725 = i719[8]
  var i724 = new (System.Collections.Generic.List$1(Bridge.ns('SlotAttachmentPair')))
  for(var i = 0; i < i725.length; i += 1) {
    i724.add(request.d('SlotAttachmentPair', i725[i + 0]));
  }
  i718.myEquipmentSet = i724
  return i718
}

Deserializers["CharacterEquipmentSetup"] = function (request, data, root) {
  var i728 = root || request.c( 'CharacterEquipmentSetup' )
  var i729 = data
  request.r(i729[0], i729[1], 0, i728, 'character')
  request.r(i729[2], i729[3], 0, i728, 'equipmentData')
  return i728
}

Deserializers["SkinToggleEntry"] = function (request, data, root) {
  var i732 = root || request.c( 'SkinToggleEntry' )
  var i733 = data
  i732.isEnabled = !!i733[0]
  i732.skinName = i733[1]
  request.r(i733[2], i733[3], 0, i732, 'skeletonDataAsset')
  return i732
}

Deserializers["SlotAttachmentPair"] = function (request, data, root) {
  var i736 = root || request.c( 'SlotAttachmentPair' )
  var i737 = data
  i736.isEnabled = !!i737[0]
  i736.slotName = i737[1]
  i736.attachmentName = i737[2]
  request.r(i737[3], i737[4], 0, i736, 'skeletonDataAsset')
  return i736
}

Deserializers["GameManager"] = function (request, data, root) {
  var i738 = root || request.c( 'GameManager' )
  var i739 = data
  i738.isGoogleBuild = !!i739[0]
  var i741 = i739[1]
  var i740 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.GameObject')))
  for(var i = 0; i < i741.length; i += 2) {
  request.r(i741[i + 0], i741[i + 1], 1, i740, '')
  }
  i738.googleDisabledObjects = i740
  var i743 = i739[2]
  var i742 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Behaviour')))
  for(var i = 0; i < i743.length; i += 2) {
  request.r(i743[i + 0], i743[i + 1], 1, i742, '')
  }
  i738.googleDisabledBehaviours = i742
  return i738
}

Deserializers["SlotManager"] = function (request, data, root) {
  var i748 = root || request.c( 'SlotManager' )
  var i749 = data
  var i751 = i749[0]
  var i750 = new (System.Collections.Generic.List$1(Bridge.ns('SlotSetup')))
  for(var i = 0; i < i751.length; i += 2) {
  request.r(i751[i + 0], i751[i + 1], 1, i750, '')
  }
  i748.allSlots = i750
  i748.maxSlotsToPlay = i749[1]
  return i748
}

Deserializers["Ply_Pool"] = function (request, data, root) {
  var i754 = root || request.c( 'Ply_Pool' )
  var i755 = data
  var i757 = i755[0]
  var i756 = []
  for(var i = 0; i < i757.length; i += 1) {
    i756.push( request.d('Ply_Pool+PoolAmount', i757[i + 0]) );
  }
  i754.poolAmounts = i756
  return i754
}

Deserializers["Ply_Pool+PoolAmount"] = function (request, data, root) {
  var i760 = root || request.c( 'Ply_Pool+PoolAmount' )
  var i761 = data
  i760.type = i761[0]
  i760.amount = i761[1]
  request.r(i761[2], i761[3], 0, i760, 'gameUnit')
  return i760
}

Deserializers["Ply_SoundManager"] = function (request, data, root) {
  var i762 = root || request.c( 'Ply_SoundManager' )
  var i763 = data
  i762.fxAudio = request.d('FxAudio', i763[0], i762.fxAudio)
  request.r(i763[1], i763[2], 0, i762, 'bgm1')
  return i762
}

Deserializers["FxAudio"] = function (request, data, root) {
  var i764 = root || request.c( 'FxAudio' )
  var i765 = data
  i764.ClickBox = request.d('SoundData', i765[0], i764.ClickBox)
  i764.Happy = request.d('SoundData', i765[1], i764.Happy)
  i764.Wrong = request.d('SoundData', i765[2], i764.Wrong)
  i764.Spray = request.d('SoundData', i765[3], i764.Spray)
  i764.Brush = request.d('SoundData', i765[4], i764.Brush)
  return i764
}

Deserializers["SoundData"] = function (request, data, root) {
  var i766 = root || request.c( 'SoundData' )
  var i767 = data
  request.r(i767[0], i767[1], 0, i766, 'clip')
  i766.repeatCount = i767[2]
  return i766
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i768 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i769 = data
  request.r(i769[0], i769[1], 0, i768, 'clip')
  request.r(i769[2], i769[3], 0, i768, 'outputAudioMixerGroup')
  i768.playOnAwake = !!i769[4]
  i768.loop = !!i769[5]
  i768.time = i769[6]
  i768.volume = i769[7]
  i768.pitch = i769[8]
  i768.enabled = !!i769[9]
  return i768
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i770 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i771 = data
  request.r(i771[0], i771[1], 0, i770, 'animatorController')
  request.r(i771[2], i771[3], 0, i770, 'avatar')
  i770.updateMode = i771[4]
  i770.hasTransformHierarchy = !!i771[5]
  i770.applyRootMotion = !!i771[6]
  var i773 = i771[7]
  var i772 = []
  for(var i = 0; i < i773.length; i += 2) {
  request.r(i773[i + 0], i773[i + 1], 2, i772, '')
  }
  i770.humanBones = i772
  i770.enabled = !!i771[8]
  return i770
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i776 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i777 = data
  i776.center = new pc.Vec3( i777[0], i777[1], i777[2] )
  i776.radius = i777[3]
  i776.height = i777[4]
  i776.direction = i777[5]
  i776.enabled = !!i777[6]
  i776.isTrigger = !!i777[7]
  request.r(i777[8], i777[9], 0, i776, 'material')
  return i776
}

Deserializers["BalloonController"] = function (request, data, root) {
  var i778 = root || request.c( 'BalloonController' )
  var i779 = data
  request.r(i779[0], i779[1], 0, i778, 'targetItem')
  i778.interactableLayer = UnityEngine.LayerMask.FromIntegerValue( i779[2] )
  i778.flyDuration = i779[3]
  i778.scaleDuration = i779[4]
  i778.delayBeforeNextSlot = i779[5]
  return i778
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer"] = function (request, data, root) {
  var i780 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer' )
  var i781 = data
  i780.color = new pc.Color(i781[0], i781[1], i781[2], i781[3])
  request.r(i781[4], i781[5], 0, i780, 'sprite')
  i780.flipX = !!i781[6]
  i780.flipY = !!i781[7]
  i780.drawMode = i781[8]
  i780.size = new pc.Vec2( i781[9], i781[10] )
  i780.tileMode = i781[11]
  i780.adaptiveModeThreshold = i781[12]
  i780.maskInteraction = i781[13]
  i780.spriteSortPoint = i781[14]
  i780.enabled = !!i781[15]
  request.r(i781[16], i781[17], 0, i780, 'sharedMaterial')
  var i783 = i781[18]
  var i782 = []
  for(var i = 0; i < i783.length; i += 2) {
  request.r(i783[i + 0], i783[i + 1], 2, i782, '')
  }
  i780.sharedMaterials = i782
  i780.receiveShadows = !!i781[19]
  i780.shadowCastingMode = i781[20]
  i780.sortingLayerID = i781[21]
  i780.sortingOrder = i781[22]
  i780.lightmapIndex = i781[23]
  i780.lightmapSceneIndex = i781[24]
  i780.lightmapScaleOffset = new pc.Vec4( i781[25], i781[26], i781[27], i781[28] )
  i780.lightProbeUsage = i781[29]
  i780.reflectionProbeUsage = i781[30]
  return i780
}

Deserializers["SlotSetup"] = function (request, data, root) {
  var i786 = root || request.c( 'SlotSetup' )
  var i787 = data
  request.r(i787[0], i787[1], 0, i786, 'slotData')
  request.r(i787[2], i787[3], 0, i786, 'borderGold')
  request.r(i787[4], i787[5], 0, i786, 'borderWhite')
  request.r(i787[6], i787[7], 0, i786, 'greyCard')
  request.r(i787[8], i787[9], 0, i786, 'blueCard')
  request.r(i787[10], i787[11], 0, i786, 'greenCard')
  request.r(i787[12], i787[13], 0, i786, 'greenTick')
  request.r(i787[14], i787[15], 0, i786, 'leftBalloonObj')
  request.r(i787[16], i787[17], 0, i786, 'rightBalloonObj')
  request.r(i787[18], i787[19], 0, i786, 'leftBalloonItemRenderer')
  request.r(i787[20], i787[21], 0, i786, 'rightBalloonItemRenderer')
  return i786
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i788 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i789 = data
  request.r(i789[0], i789[1], 0, i788, 'sharedMesh')
  return i788
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i790 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i791 = data
  request.r(i791[0], i791[1], 0, i790, 'additionalVertexStreams')
  i790.enabled = !!i791[2]
  request.r(i791[3], i791[4], 0, i790, 'sharedMaterial')
  var i793 = i791[5]
  var i792 = []
  for(var i = 0; i < i793.length; i += 2) {
  request.r(i793[i + 0], i793[i + 1], 2, i792, '')
  }
  i790.sharedMaterials = i792
  i790.receiveShadows = !!i791[6]
  i790.shadowCastingMode = i791[7]
  i790.sortingLayerID = i791[8]
  i790.sortingOrder = i791[9]
  i790.lightmapIndex = i791[10]
  i790.lightmapSceneIndex = i791[11]
  i790.lightmapScaleOffset = new pc.Vec4( i791[12], i791[13], i791[14], i791[15] )
  i790.lightProbeUsage = i791[16]
  i790.reflectionProbeUsage = i791[17]
  return i790
}

Deserializers["Spine.Unity.SkeletonAnimation"] = function (request, data, root) {
  var i794 = root || request.c( 'Spine.Unity.SkeletonAnimation' )
  var i795 = data
  i794.loop = !!i795[0]
  i794.timeScale = i795[1]
  request.r(i795[2], i795[3], 0, i794, 'skeletonDataAsset')
  i794.initialSkinName = i795[4]
  i794.fixPrefabOverrideViaMeshFilter = i795[5]
  i794.initialFlipX = !!i795[6]
  i794.initialFlipY = !!i795[7]
  i794.updateWhenInvisible = i795[8]
  i794.zSpacing = i795[9]
  i794.useClipping = !!i795[10]
  i794.immutableTriangles = !!i795[11]
  i794.pmaVertexColors = !!i795[12]
  i794.clearStateOnDisable = !!i795[13]
  i794.tintBlack = !!i795[14]
  i794.singleSubmesh = !!i795[15]
  i794.fixDrawOrder = !!i795[16]
  i794.addNormals = !!i795[17]
  i794.calculateTangents = !!i795[18]
  i794.maskInteraction = i795[19]
  i794.maskMaterials = request.d('Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials', i795[20], i794.maskMaterials)
  i794.disableRenderingOnOverride = !!i795[21]
  i794.updateTiming = i795[22]
  i794.unscaledTime = !!i795[23]
  i794._animationName = i795[24]
  var i797 = i795[25]
  var i796 = []
  for(var i = 0; i < i797.length; i += 1) {
    i796.push( i797[i + 0] );
  }
  i794.separatorSlotNames = i796
  i794.physicsPositionInheritanceFactor = new pc.Vec2( i795[26], i795[27] )
  i794.physicsRotationInheritanceFactor = i795[28]
  request.r(i795[29], i795[30], 0, i794, 'physicsMovementRelativeTo')
  return i794
}

Deserializers["Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials"] = function (request, data, root) {
  var i798 = root || request.c( 'Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials' )
  var i799 = data
  var i801 = i799[0]
  var i800 = []
  for(var i = 0; i < i801.length; i += 2) {
  request.r(i801[i + 0], i801[i + 1], 2, i800, '')
  }
  i798.materialsMaskDisabled = i800
  var i803 = i799[1]
  var i802 = []
  for(var i = 0; i < i803.length; i += 2) {
  request.r(i803[i + 0], i803[i + 1], 2, i802, '')
  }
  i798.materialsInsideMask = i802
  var i805 = i799[2]
  var i804 = []
  for(var i = 0; i < i805.length; i += 2) {
  request.r(i805[i + 0], i805[i + 1], 2, i804, '')
  }
  i798.materialsOutsideMask = i804
  return i798
}

Deserializers["Character"] = function (request, data, root) {
  var i808 = root || request.c( 'Character' )
  var i809 = data
  request.r(i809[0], i809[1], 0, i808, 'tf')
  request.r(i809[2], i809[3], 0, i808, 'skeletonAnimation')
  var i811 = i809[4]
  var i810 = new (System.Collections.Generic.List$1(Bridge.ns('SlotAttachmentPair')))
  for(var i = 0; i < i811.length; i += 1) {
    i810.add(request.d('SlotAttachmentPair', i811[i + 0]));
  }
  i808.currentAppliedPairs = i810
  var i813 = i809[5]
  var i812 = new (System.Collections.Generic.List$1(Bridge.ns('System.String')))
  for(var i = 0; i < i813.length; i += 1) {
    i812.add(i813[i + 0]);
  }
  i808.currentAppliedSkinNames = i812
  return i808
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i816 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i817 = data
  i816.pivot = new pc.Vec2( i817[0], i817[1] )
  i816.anchorMin = new pc.Vec2( i817[2], i817[3] )
  i816.anchorMax = new pc.Vec2( i817[4], i817[5] )
  i816.sizeDelta = new pc.Vec2( i817[6], i817[7] )
  i816.anchoredPosition3D = new pc.Vec3( i817[8], i817[9], i817[10] )
  i816.rotation = new pc.Quat(i817[11], i817[12], i817[13], i817[14])
  i816.scale = new pc.Vec3( i817[15], i817[16], i817[17] )
  return i816
}

Deserializers["TMPro.TextMeshPro"] = function (request, data, root) {
  var i818 = root || request.c( 'TMPro.TextMeshPro' )
  var i819 = data
  i818._SortingLayer = i819[0]
  i818._SortingLayerID = i819[1]
  i818._SortingOrder = i819[2]
  i818.m_hasFontAssetChanged = !!i819[3]
  request.r(i819[4], i819[5], 0, i818, 'm_renderer')
  i818.m_maskType = i819[6]
  i818.m_text = i819[7]
  i818.m_isRightToLeft = !!i819[8]
  request.r(i819[9], i819[10], 0, i818, 'm_fontAsset')
  request.r(i819[11], i819[12], 0, i818, 'm_sharedMaterial')
  var i821 = i819[13]
  var i820 = []
  for(var i = 0; i < i821.length; i += 2) {
  request.r(i821[i + 0], i821[i + 1], 2, i820, '')
  }
  i818.m_fontSharedMaterials = i820
  request.r(i819[14], i819[15], 0, i818, 'm_fontMaterial')
  var i823 = i819[16]
  var i822 = []
  for(var i = 0; i < i823.length; i += 2) {
  request.r(i823[i + 0], i823[i + 1], 2, i822, '')
  }
  i818.m_fontMaterials = i822
  i818.m_fontColor32 = UnityEngine.Color32.ConstructColor(i819[17], i819[18], i819[19], i819[20])
  i818.m_fontColor = new pc.Color(i819[21], i819[22], i819[23], i819[24])
  i818.m_enableVertexGradient = !!i819[25]
  i818.m_colorMode = i819[26]
  i818.m_fontColorGradient = request.d('TMPro.VertexGradient', i819[27], i818.m_fontColorGradient)
  request.r(i819[28], i819[29], 0, i818, 'm_fontColorGradientPreset')
  request.r(i819[30], i819[31], 0, i818, 'm_spriteAsset')
  i818.m_tintAllSprites = !!i819[32]
  request.r(i819[33], i819[34], 0, i818, 'm_StyleSheet')
  i818.m_TextStyleHashCode = i819[35]
  i818.m_overrideHtmlColors = !!i819[36]
  i818.m_faceColor = UnityEngine.Color32.ConstructColor(i819[37], i819[38], i819[39], i819[40])
  i818.m_fontSize = i819[41]
  i818.m_fontSizeBase = i819[42]
  i818.m_fontWeight = i819[43]
  i818.m_enableAutoSizing = !!i819[44]
  i818.m_fontSizeMin = i819[45]
  i818.m_fontSizeMax = i819[46]
  i818.m_fontStyle = i819[47]
  i818.m_HorizontalAlignment = i819[48]
  i818.m_VerticalAlignment = i819[49]
  i818.m_textAlignment = i819[50]
  i818.m_characterSpacing = i819[51]
  i818.m_wordSpacing = i819[52]
  i818.m_lineSpacing = i819[53]
  i818.m_lineSpacingMax = i819[54]
  i818.m_paragraphSpacing = i819[55]
  i818.m_charWidthMaxAdj = i819[56]
  i818.m_TextWrappingMode = i819[57]
  i818.m_wordWrappingRatios = i819[58]
  i818.m_overflowMode = i819[59]
  request.r(i819[60], i819[61], 0, i818, 'm_linkedTextComponent')
  request.r(i819[62], i819[63], 0, i818, 'parentLinkedComponent')
  i818.m_enableKerning = !!i819[64]
  var i825 = i819[65]
  var i824 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i825.length; i += 1) {
    i824.add(i825[i + 0]);
  }
  i818.m_ActiveFontFeatures = i824
  i818.m_enableExtraPadding = !!i819[66]
  i818.checkPaddingRequired = !!i819[67]
  i818.m_isRichText = !!i819[68]
  i818.m_parseCtrlCharacters = !!i819[69]
  i818.m_isOrthographic = !!i819[70]
  i818.m_isCullingEnabled = !!i819[71]
  i818.m_horizontalMapping = i819[72]
  i818.m_verticalMapping = i819[73]
  i818.m_uvLineOffset = i819[74]
  i818.m_geometrySortingOrder = i819[75]
  i818.m_IsTextObjectScaleStatic = !!i819[76]
  i818.m_VertexBufferAutoSizeReduction = !!i819[77]
  i818.m_useMaxVisibleDescender = !!i819[78]
  i818.m_pageToDisplay = i819[79]
  i818.m_margin = new pc.Vec4( i819[80], i819[81], i819[82], i819[83] )
  i818.m_isUsingLegacyAnimationComponent = !!i819[84]
  i818.m_isVolumetricText = !!i819[85]
  request.r(i819[86], i819[87], 0, i818, 'm_Material')
  i818.m_EmojiFallbackSupport = !!i819[88]
  i818.m_Maskable = !!i819[89]
  i818.m_Color = new pc.Color(i819[90], i819[91], i819[92], i819[93])
  i818.m_RaycastTarget = !!i819[94]
  i818.m_RaycastPadding = new pc.Vec4( i819[95], i819[96], i819[97], i819[98] )
  return i818
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i826 = root || request.c( 'TMPro.VertexGradient' )
  var i827 = data
  i826.topLeft = new pc.Color(i827[0], i827[1], i827[2], i827[3])
  i826.topRight = new pc.Color(i827[4], i827[5], i827[6], i827[7])
  i826.bottomLeft = new pc.Color(i827[8], i827[9], i827[10], i827[11])
  i826.bottomRight = new pc.Color(i827[12], i827[13], i827[14], i827[15])
  return i826
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i830 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i831 = data
  request.r(i831[0], i831[1], 0, i830, 'm_FirstSelected')
  i830.m_sendNavigationEvents = !!i831[2]
  i830.m_DragThreshold = i831[3]
  return i830
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i832 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i833 = data
  i832.m_HorizontalAxis = i833[0]
  i832.m_VerticalAxis = i833[1]
  i832.m_SubmitButton = i833[2]
  i832.m_CancelButton = i833[3]
  i832.m_InputActionsPerSecond = i833[4]
  i832.m_RepeatDelay = i833[5]
  i832.m_ForceModuleActive = !!i833[6]
  i832.m_SendPointerHoverToParent = !!i833[7]
  return i832
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i834 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i835 = data
  i834.ambientIntensity = i835[0]
  i834.reflectionIntensity = i835[1]
  i834.ambientMode = i835[2]
  i834.ambientLight = new pc.Color(i835[3], i835[4], i835[5], i835[6])
  i834.ambientSkyColor = new pc.Color(i835[7], i835[8], i835[9], i835[10])
  i834.ambientGroundColor = new pc.Color(i835[11], i835[12], i835[13], i835[14])
  i834.ambientEquatorColor = new pc.Color(i835[15], i835[16], i835[17], i835[18])
  i834.fogColor = new pc.Color(i835[19], i835[20], i835[21], i835[22])
  i834.fogEndDistance = i835[23]
  i834.fogStartDistance = i835[24]
  i834.fogDensity = i835[25]
  i834.fog = !!i835[26]
  request.r(i835[27], i835[28], 0, i834, 'skybox')
  i834.fogMode = i835[29]
  var i837 = i835[30]
  var i836 = []
  for(var i = 0; i < i837.length; i += 1) {
    i836.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i837[i + 0]) );
  }
  i834.lightmaps = i836
  i834.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i835[31], i834.lightProbes)
  i834.lightmapsMode = i835[32]
  i834.mixedBakeMode = i835[33]
  i834.environmentLightingMode = i835[34]
  i834.ambientProbe = new pc.SphericalHarmonicsL2(i835[35])
  i834.referenceAmbientProbe = new pc.SphericalHarmonicsL2(i835[36])
  i834.useReferenceAmbientProbe = !!i835[37]
  request.r(i835[38], i835[39], 0, i834, 'customReflection')
  request.r(i835[40], i835[41], 0, i834, 'defaultReflection')
  i834.defaultReflectionMode = i835[42]
  i834.defaultReflectionResolution = i835[43]
  i834.sunLightObjectId = i835[44]
  i834.pixelLightCount = i835[45]
  i834.defaultReflectionHDR = !!i835[46]
  i834.hasLightDataAsset = !!i835[47]
  i834.hasManualGenerate = !!i835[48]
  return i834
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i840 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i841 = data
  request.r(i841[0], i841[1], 0, i840, 'lightmapColor')
  request.r(i841[2], i841[3], 0, i840, 'lightmapDirection')
  request.r(i841[4], i841[5], 0, i840, 'shadowMask')
  return i840
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i842 = root || new UnityEngine.LightProbes()
  var i843 = data
  return i842
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i850 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i851 = data
  var i853 = i851[0]
  var i852 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i853.length; i += 1) {
    i852.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i853[i + 0]));
  }
  i850.ShaderCompilationErrors = i852
  i850.name = i851[1]
  i850.guid = i851[2]
  var i855 = i851[3]
  var i854 = []
  for(var i = 0; i < i855.length; i += 1) {
    i854.push( i855[i + 0] );
  }
  i850.shaderDefinedKeywords = i854
  var i857 = i851[4]
  var i856 = []
  for(var i = 0; i < i857.length; i += 1) {
    i856.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i857[i + 0]) );
  }
  i850.passes = i856
  var i859 = i851[5]
  var i858 = []
  for(var i = 0; i < i859.length; i += 1) {
    i858.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i859[i + 0]) );
  }
  i850.usePasses = i858
  var i861 = i851[6]
  var i860 = []
  for(var i = 0; i < i861.length; i += 1) {
    i860.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i861[i + 0]) );
  }
  i850.defaultParameterValues = i860
  request.r(i851[7], i851[8], 0, i850, 'unityFallbackShader')
  i850.readDepth = !!i851[9]
  i850.hasDepthOnlyPass = !!i851[10]
  i850.isCreatedByShaderGraph = !!i851[11]
  i850.disableBatching = !!i851[12]
  i850.compiled = !!i851[13]
  return i850
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i864 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i865 = data
  i864.shaderName = i865[0]
  i864.errorMessage = i865[1]
  return i864
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i868 = root || new pc.UnityShaderPass()
  var i869 = data
  i868.id = i869[0]
  i868.subShaderIndex = i869[1]
  i868.name = i869[2]
  i868.passType = i869[3]
  i868.grabPassTextureName = i869[4]
  i868.usePass = !!i869[5]
  i868.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i869[6], i868.zTest)
  i868.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i869[7], i868.zWrite)
  i868.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i869[8], i868.culling)
  i868.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i869[9], i868.blending)
  i868.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i869[10], i868.alphaBlending)
  i868.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i869[11], i868.colorWriteMask)
  i868.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i869[12], i868.offsetUnits)
  i868.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i869[13], i868.offsetFactor)
  i868.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i869[14], i868.stencilRef)
  i868.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i869[15], i868.stencilReadMask)
  i868.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i869[16], i868.stencilWriteMask)
  i868.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i869[17], i868.stencilOp)
  i868.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i869[18], i868.stencilOpFront)
  i868.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i869[19], i868.stencilOpBack)
  var i871 = i869[20]
  var i870 = []
  for(var i = 0; i < i871.length; i += 1) {
    i870.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i871[i + 0]) );
  }
  i868.tags = i870
  var i873 = i869[21]
  var i872 = []
  for(var i = 0; i < i873.length; i += 1) {
    i872.push( i873[i + 0] );
  }
  i868.passDefinedKeywords = i872
  var i875 = i869[22]
  var i874 = []
  for(var i = 0; i < i875.length; i += 1) {
    i874.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i875[i + 0]) );
  }
  i868.passDefinedKeywordGroups = i874
  var i877 = i869[23]
  var i876 = []
  for(var i = 0; i < i877.length; i += 1) {
    i876.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i877[i + 0]) );
  }
  i868.variants = i876
  var i879 = i869[24]
  var i878 = []
  for(var i = 0; i < i879.length; i += 1) {
    i878.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i879[i + 0]) );
  }
  i868.excludedVariants = i878
  i868.hasDepthReader = !!i869[25]
  return i868
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i880 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i881 = data
  i880.val = i881[0]
  i880.name = i881[1]
  return i880
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i882 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i883 = data
  i882.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i883[0], i882.src)
  i882.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i883[1], i882.dst)
  i882.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i883[2], i882.op)
  return i882
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i884 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i885 = data
  i884.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i885[0], i884.pass)
  i884.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i885[1], i884.fail)
  i884.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i885[2], i884.zFail)
  i884.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i885[3], i884.comp)
  return i884
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i888 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i889 = data
  i888.name = i889[0]
  i888.value = i889[1]
  return i888
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i892 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i893 = data
  var i895 = i893[0]
  var i894 = []
  for(var i = 0; i < i895.length; i += 1) {
    i894.push( i895[i + 0] );
  }
  i892.keywords = i894
  i892.hasDiscard = !!i893[1]
  return i892
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i898 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i899 = data
  i898.passId = i899[0]
  i898.subShaderIndex = i899[1]
  var i901 = i899[2]
  var i900 = []
  for(var i = 0; i < i901.length; i += 1) {
    i900.push( i901[i + 0] );
  }
  i898.keywords = i900
  i898.vertexProgram = i899[3]
  i898.fragmentProgram = i899[4]
  i898.exportedForWebGl2 = !!i899[5]
  i898.readDepth = !!i899[6]
  return i898
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i904 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i905 = data
  request.r(i905[0], i905[1], 0, i904, 'shader')
  i904.pass = i905[2]
  return i904
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i908 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i909 = data
  i908.name = i909[0]
  i908.type = i909[1]
  i908.value = new pc.Vec4( i909[2], i909[3], i909[4], i909[5] )
  i908.textureValue = i909[6]
  i908.shaderPropertyFlag = i909[7]
  return i908
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i910 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i911 = data
  i910.name = i911[0]
  request.r(i911[1], i911[2], 0, i910, 'texture')
  i910.aabb = i911[3]
  i910.vertices = i911[4]
  i910.triangles = i911[5]
  i910.textureRect = UnityEngine.Rect.MinMaxRect(i911[6], i911[7], i911[8], i911[9])
  i910.packedRect = UnityEngine.Rect.MinMaxRect(i911[10], i911[11], i911[12], i911[13])
  i910.border = new pc.Vec4( i911[14], i911[15], i911[16], i911[17] )
  i910.transparency = i911[18]
  i910.bounds = i911[19]
  i910.pixelsPerUnit = i911[20]
  i910.textureWidth = i911[21]
  i910.textureHeight = i911[22]
  i910.nativeSize = new pc.Vec2( i911[23], i911[24] )
  i910.pivot = new pc.Vec2( i911[25], i911[26] )
  i910.textureRectOffset = new pc.Vec2( i911[27], i911[28] )
  return i910
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i912 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i913 = data
  i912.name = i913[0]
  return i912
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i914 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i915 = data
  i914.name = i915[0]
  i914.wrapMode = i915[1]
  i914.isLooping = !!i915[2]
  i914.length = i915[3]
  var i917 = i915[4]
  var i916 = []
  for(var i = 0; i < i917.length; i += 1) {
    i916.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i917[i + 0]) );
  }
  i914.curves = i916
  var i919 = i915[5]
  var i918 = []
  for(var i = 0; i < i919.length; i += 1) {
    i918.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i919[i + 0]) );
  }
  i914.events = i918
  i914.halfPrecision = !!i915[6]
  i914._frameRate = i915[7]
  i914.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i915[8], i914.localBounds)
  i914.hasMuscleCurves = !!i915[9]
  var i921 = i915[10]
  var i920 = []
  for(var i = 0; i < i921.length; i += 1) {
    i920.push( i921[i + 0] );
  }
  i914.clipMuscleConstant = i920
  i914.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i915[11], i914.clipBindingConstant)
  return i914
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i924 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i925 = data
  i924.path = i925[0]
  i924.hash = i925[1]
  i924.componentType = i925[2]
  i924.property = i925[3]
  i924.keys = i925[4]
  var i927 = i925[5]
  var i926 = []
  for(var i = 0; i < i927.length; i += 1) {
    i926.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i927[i + 0]) );
  }
  i924.objectReferenceKeys = i926
  return i924
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i930 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i931 = data
  i930.time = i931[0]
  request.r(i931[1], i931[2], 0, i930, 'value')
  return i930
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i934 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i935 = data
  i934.functionName = i935[0]
  i934.floatParameter = i935[1]
  i934.intParameter = i935[2]
  i934.stringParameter = i935[3]
  request.r(i935[4], i935[5], 0, i934, 'objectReferenceParameter')
  i934.time = i935[6]
  return i934
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i936 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i937 = data
  i936.center = new pc.Vec3( i937[0], i937[1], i937[2] )
  i936.extends = new pc.Vec3( i937[3], i937[4], i937[5] )
  return i936
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i940 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i941 = data
  var i943 = i941[0]
  var i942 = []
  for(var i = 0; i < i943.length; i += 1) {
    i942.push( i943[i + 0] );
  }
  i940.genericBindings = i942
  var i945 = i941[1]
  var i944 = []
  for(var i = 0; i < i945.length; i += 1) {
    i944.push( i945[i + 0] );
  }
  i940.pptrCurveMapping = i944
  return i940
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i946 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i947 = data
  i946.name = i947[0]
  i946.ascent = i947[1]
  i946.originalLineHeight = i947[2]
  i946.fontSize = i947[3]
  var i949 = i947[4]
  var i948 = []
  for(var i = 0; i < i949.length; i += 1) {
    i948.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i949[i + 0]) );
  }
  i946.characterInfo = i948
  request.r(i947[5], i947[6], 0, i946, 'texture')
  i946.originalFontSize = i947[7]
  return i946
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i952 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i953 = data
  i952.index = i953[0]
  i952.advance = i953[1]
  i952.bearing = i953[2]
  i952.glyphWidth = i953[3]
  i952.glyphHeight = i953[4]
  i952.minX = i953[5]
  i952.maxX = i953[6]
  i952.minY = i953[7]
  i952.maxY = i953[8]
  i952.uvBottomLeftX = i953[9]
  i952.uvBottomLeftY = i953[10]
  i952.uvBottomRightX = i953[11]
  i952.uvBottomRightY = i953[12]
  i952.uvTopLeftX = i953[13]
  i952.uvTopLeftY = i953[14]
  i952.uvTopRightX = i953[15]
  i952.uvTopRightY = i953[16]
  return i952
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController"] = function (request, data, root) {
  var i954 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController' )
  var i955 = data
  i954.name = i955[0]
  var i957 = i955[1]
  var i956 = []
  for(var i = 0; i < i957.length; i += 1) {
    i956.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer', i957[i + 0]) );
  }
  i954.layers = i956
  var i959 = i955[2]
  var i958 = []
  for(var i = 0; i < i959.length; i += 1) {
    i958.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter', i959[i + 0]) );
  }
  i954.parameters = i958
  i954.animationClips = i955[3]
  i954.avatarUnsupported = i955[4]
  return i954
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer"] = function (request, data, root) {
  var i962 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer' )
  var i963 = data
  i962.name = i963[0]
  i962.defaultWeight = i963[1]
  i962.blendingMode = i963[2]
  i962.avatarMask = i963[3]
  i962.syncedLayerIndex = i963[4]
  i962.syncedLayerAffectsTiming = !!i963[5]
  i962.syncedLayers = i963[6]
  i962.stateMachine = request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i963[7], i962.stateMachine)
  return i962
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine"] = function (request, data, root) {
  var i964 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine' )
  var i965 = data
  i964.id = i965[0]
  i964.name = i965[1]
  i964.path = i965[2]
  var i967 = i965[3]
  var i966 = []
  for(var i = 0; i < i967.length; i += 1) {
    i966.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState', i967[i + 0]) );
  }
  i964.states = i966
  var i969 = i965[4]
  var i968 = []
  for(var i = 0; i < i969.length; i += 1) {
    i968.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i969[i + 0]) );
  }
  i964.machines = i968
  var i971 = i965[5]
  var i970 = []
  for(var i = 0; i < i971.length; i += 1) {
    i970.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i971[i + 0]) );
  }
  i964.entryStateTransitions = i970
  var i973 = i965[6]
  var i972 = []
  for(var i = 0; i < i973.length; i += 1) {
    i972.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i973[i + 0]) );
  }
  i964.exitStateTransitions = i972
  var i975 = i965[7]
  var i974 = []
  for(var i = 0; i < i975.length; i += 1) {
    i974.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i975[i + 0]) );
  }
  i964.anyStateTransitions = i974
  i964.defaultStateId = i965[8]
  return i964
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState"] = function (request, data, root) {
  var i978 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState' )
  var i979 = data
  i978.id = i979[0]
  i978.name = i979[1]
  i978.cycleOffset = i979[2]
  i978.cycleOffsetParameter = i979[3]
  i978.cycleOffsetParameterActive = !!i979[4]
  i978.mirror = !!i979[5]
  i978.mirrorParameter = i979[6]
  i978.mirrorParameterActive = !!i979[7]
  i978.motionId = i979[8]
  i978.nameHash = i979[9]
  i978.fullPathHash = i979[10]
  i978.speed = i979[11]
  i978.speedParameter = i979[12]
  i978.speedParameterActive = !!i979[13]
  i978.tag = i979[14]
  i978.tagHash = i979[15]
  i978.writeDefaultValues = !!i979[16]
  var i981 = i979[17]
  var i980 = []
  for(var i = 0; i < i981.length; i += 2) {
  request.r(i981[i + 0], i981[i + 1], 2, i980, '')
  }
  i978.behaviours = i980
  var i983 = i979[18]
  var i982 = []
  for(var i = 0; i < i983.length; i += 1) {
    i982.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i983[i + 0]) );
  }
  i978.transitions = i982
  return i978
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition"] = function (request, data, root) {
  var i988 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition' )
  var i989 = data
  i988.fullPath = i989[0]
  i988.canTransitionToSelf = !!i989[1]
  i988.duration = i989[2]
  i988.exitTime = i989[3]
  i988.hasExitTime = !!i989[4]
  i988.hasFixedDuration = !!i989[5]
  i988.interruptionSource = i989[6]
  i988.offset = i989[7]
  i988.orderedInterruption = !!i989[8]
  i988.destinationStateId = i989[9]
  i988.isExit = !!i989[10]
  i988.mute = !!i989[11]
  i988.solo = !!i989[12]
  var i991 = i989[13]
  var i990 = []
  for(var i = 0; i < i991.length; i += 1) {
    i990.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i991[i + 0]) );
  }
  i988.conditions = i990
  return i988
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition"] = function (request, data, root) {
  var i996 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition' )
  var i997 = data
  i996.destinationStateId = i997[0]
  i996.isExit = !!i997[1]
  i996.mute = !!i997[2]
  i996.solo = !!i997[3]
  var i999 = i997[4]
  var i998 = []
  for(var i = 0; i < i999.length; i += 1) {
    i998.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i999[i + 0]) );
  }
  i996.conditions = i998
  return i996
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter"] = function (request, data, root) {
  var i1002 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter' )
  var i1003 = data
  i1002.defaultBool = !!i1003[0]
  i1002.defaultFloat = i1003[1]
  i1002.defaultInt = i1003[2]
  i1002.name = i1003[3]
  i1002.nameHash = i1003[4]
  i1002.type = i1003[5]
  return i1002
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i1004 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i1005 = data
  i1004.name = i1005[0]
  i1004.bytes64 = i1005[1]
  i1004.data = i1005[2]
  return i1004
}

Deserializers["SlotDataSO"] = function (request, data, root) {
  var i1006 = root || request.c( 'SlotDataSO' )
  var i1007 = data
  i1006.slotName = i1007[0]
  request.r(i1007[1], i1007[2], 0, i1006, 'leftItemSprite')
  request.r(i1007[3], i1007[4], 0, i1006, 'rightItemSprite')
  return i1006
}

Deserializers["Spine.Unity.SkeletonDataAsset"] = function (request, data, root) {
  var i1008 = root || request.c( 'Spine.Unity.SkeletonDataAsset' )
  var i1009 = data
  var i1011 = i1009[0]
  var i1010 = []
  for(var i = 0; i < i1011.length; i += 2) {
  request.r(i1011[i + 0], i1011[i + 1], 2, i1010, '')
  }
  i1008.atlasAssets = i1010
  i1008.scale = i1009[1]
  request.r(i1009[2], i1009[3], 0, i1008, 'skeletonJSON')
  i1008.isUpgradingBlendModeMaterials = !!i1009[4]
  i1008.blendModeMaterials = request.d('Spine.Unity.BlendModeMaterials', i1009[5], i1008.blendModeMaterials)
  var i1013 = i1009[6]
  var i1012 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.SkeletonDataModifierAsset')))
  for(var i = 0; i < i1013.length; i += 2) {
  request.r(i1013[i + 0], i1013[i + 1], 1, i1012, '')
  }
  i1008.skeletonDataModifiers = i1012
  var i1015 = i1009[7]
  var i1014 = []
  for(var i = 0; i < i1015.length; i += 1) {
    i1014.push( i1015[i + 0] );
  }
  i1008.fromAnimation = i1014
  var i1017 = i1009[8]
  var i1016 = []
  for(var i = 0; i < i1017.length; i += 1) {
    i1016.push( i1017[i + 0] );
  }
  i1008.toAnimation = i1016
  i1008.duration = i1009[9]
  i1008.defaultMix = i1009[10]
  request.r(i1009[11], i1009[12], 0, i1008, 'controller')
  return i1008
}

Deserializers["Spine.Unity.BlendModeMaterials"] = function (request, data, root) {
  var i1020 = root || request.c( 'Spine.Unity.BlendModeMaterials' )
  var i1021 = data
  i1020.applyAdditiveMaterial = !!i1021[0]
  var i1023 = i1021[1]
  var i1022 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i1023.length; i += 1) {
    i1022.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i1023[i + 0]));
  }
  i1020.additiveMaterials = i1022
  var i1025 = i1021[2]
  var i1024 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i1025.length; i += 1) {
    i1024.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i1025[i + 0]));
  }
  i1020.multiplyMaterials = i1024
  var i1027 = i1021[3]
  var i1026 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i1027.length; i += 1) {
    i1026.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i1027[i + 0]));
  }
  i1020.screenMaterials = i1026
  i1020.requiresBlendModeMaterials = !!i1021[4]
  return i1020
}

Deserializers["Spine.Unity.BlendModeMaterials+ReplacementMaterial"] = function (request, data, root) {
  var i1030 = root || request.c( 'Spine.Unity.BlendModeMaterials+ReplacementMaterial' )
  var i1031 = data
  i1030.pageName = i1031[0]
  request.r(i1031[1], i1031[2], 0, i1030, 'material')
  return i1030
}

Deserializers["Spine.Unity.SpineAtlasAsset"] = function (request, data, root) {
  var i1034 = root || request.c( 'Spine.Unity.SpineAtlasAsset' )
  var i1035 = data
  request.r(i1035[0], i1035[1], 0, i1034, 'atlasFile')
  var i1037 = i1035[2]
  var i1036 = []
  for(var i = 0; i < i1037.length; i += 2) {
  request.r(i1037[i + 0], i1037[i + 1], 2, i1036, '')
  }
  i1034.materials = i1036
  i1034.textureLoadingMode = i1035[3]
  request.r(i1035[4], i1035[5], 0, i1034, 'onDemandTextureLoader')
  return i1034
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i1038 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i1039 = data
  i1038.normalStyle = i1039[0]
  i1038.normalSpacingOffset = i1039[1]
  i1038.boldStyle = i1039[2]
  i1038.boldSpacing = i1039[3]
  i1038.italicStyle = i1039[4]
  i1038.tabSize = i1039[5]
  request.r(i1039[6], i1039[7], 0, i1038, 'atlas')
  i1038.m_SourceFontFileGUID = i1039[8]
  i1038.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i1039[9], i1038.m_CreationSettings)
  request.r(i1039[10], i1039[11], 0, i1038, 'm_SourceFontFile')
  i1038.m_SourceFontFilePath = i1039[12]
  i1038.m_AtlasPopulationMode = i1039[13]
  i1038.InternalDynamicOS = !!i1039[14]
  var i1041 = i1039[15]
  var i1040 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i1041.length; i += 1) {
    i1040.add(request.d('UnityEngine.TextCore.Glyph', i1041[i + 0]));
  }
  i1038.m_GlyphTable = i1040
  var i1043 = i1039[16]
  var i1042 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i1043.length; i += 1) {
    i1042.add(request.d('TMPro.TMP_Character', i1043[i + 0]));
  }
  i1038.m_CharacterTable = i1042
  var i1045 = i1039[17]
  var i1044 = []
  for(var i = 0; i < i1045.length; i += 2) {
  request.r(i1045[i + 0], i1045[i + 1], 2, i1044, '')
  }
  i1038.m_AtlasTextures = i1044
  i1038.m_AtlasTextureIndex = i1039[18]
  i1038.m_IsMultiAtlasTexturesEnabled = !!i1039[19]
  i1038.m_GetFontFeatures = !!i1039[20]
  i1038.m_ClearDynamicDataOnBuild = !!i1039[21]
  i1038.m_AtlasWidth = i1039[22]
  i1038.m_AtlasHeight = i1039[23]
  i1038.m_AtlasPadding = i1039[24]
  i1038.m_AtlasRenderMode = i1039[25]
  var i1047 = i1039[26]
  var i1046 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1047.length; i += 1) {
    i1046.add(request.d('UnityEngine.TextCore.GlyphRect', i1047[i + 0]));
  }
  i1038.m_UsedGlyphRects = i1046
  var i1049 = i1039[27]
  var i1048 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1049.length; i += 1) {
    i1048.add(request.d('UnityEngine.TextCore.GlyphRect', i1049[i + 0]));
  }
  i1038.m_FreeGlyphRects = i1048
  i1038.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i1039[28], i1038.m_FontFeatureTable)
  i1038.m_ShouldReimportFontFeatures = !!i1039[29]
  var i1051 = i1039[30]
  var i1050 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1051.length; i += 2) {
  request.r(i1051[i + 0], i1051[i + 1], 1, i1050, '')
  }
  i1038.m_FallbackFontAssetTable = i1050
  var i1053 = i1039[31]
  var i1052 = []
  for(var i = 0; i < i1053.length; i += 1) {
    i1052.push( request.d('TMPro.TMP_FontWeightPair', i1053[i + 0]) );
  }
  i1038.m_FontWeightTable = i1052
  var i1055 = i1039[32]
  var i1054 = []
  for(var i = 0; i < i1055.length; i += 1) {
    i1054.push( request.d('TMPro.TMP_FontWeightPair', i1055[i + 0]) );
  }
  i1038.fontWeights = i1054
  i1038.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i1039[33], i1038.m_fontInfo)
  var i1057 = i1039[34]
  var i1056 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i1057.length; i += 1) {
    i1056.add(request.d('TMPro.TMP_Glyph', i1057[i + 0]));
  }
  i1038.m_glyphInfoList = i1056
  i1038.m_KerningTable = request.d('TMPro.KerningTable', i1039[35], i1038.m_KerningTable)
  var i1059 = i1039[36]
  var i1058 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1059.length; i += 2) {
  request.r(i1059[i + 0], i1059[i + 1], 1, i1058, '')
  }
  i1038.fallbackFontAssets = i1058
  i1038.m_Version = i1039[37]
  i1038.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1039[38], i1038.m_FaceInfo)
  request.r(i1039[39], i1039[40], 0, i1038, 'm_Material')
  return i1038
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i1060 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i1061 = data
  i1060.sourceFontFileName = i1061[0]
  i1060.sourceFontFileGUID = i1061[1]
  i1060.faceIndex = i1061[2]
  i1060.pointSizeSamplingMode = i1061[3]
  i1060.pointSize = i1061[4]
  i1060.padding = i1061[5]
  i1060.paddingMode = i1061[6]
  i1060.packingMode = i1061[7]
  i1060.atlasWidth = i1061[8]
  i1060.atlasHeight = i1061[9]
  i1060.characterSetSelectionMode = i1061[10]
  i1060.characterSequence = i1061[11]
  i1060.referencedFontAssetGUID = i1061[12]
  i1060.referencedTextAssetGUID = i1061[13]
  i1060.fontStyle = i1061[14]
  i1060.fontStyleModifier = i1061[15]
  i1060.renderMode = i1061[16]
  i1060.includeFontFeatures = !!i1061[17]
  return i1060
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i1064 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i1065 = data
  i1064.m_Index = i1065[0]
  i1064.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1065[1], i1064.m_Metrics)
  i1064.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1065[2], i1064.m_GlyphRect)
  i1064.m_Scale = i1065[3]
  i1064.m_AtlasIndex = i1065[4]
  i1064.m_ClassDefinitionType = i1065[5]
  return i1064
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i1066 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i1067 = data
  i1066.m_Width = i1067[0]
  i1066.m_Height = i1067[1]
  i1066.m_HorizontalBearingX = i1067[2]
  i1066.m_HorizontalBearingY = i1067[3]
  i1066.m_HorizontalAdvance = i1067[4]
  return i1066
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i1068 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i1069 = data
  i1068.m_X = i1069[0]
  i1068.m_Y = i1069[1]
  i1068.m_Width = i1069[2]
  i1068.m_Height = i1069[3]
  return i1068
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i1072 = root || request.c( 'TMPro.TMP_Character' )
  var i1073 = data
  i1072.m_ElementType = i1073[0]
  i1072.m_Unicode = i1073[1]
  i1072.m_GlyphIndex = i1073[2]
  i1072.m_Scale = i1073[3]
  return i1072
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i1078 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i1079 = data
  var i1081 = i1079[0]
  var i1080 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i1081.length; i += 1) {
    i1080.add(request.d('TMPro.MultipleSubstitutionRecord', i1081[i + 0]));
  }
  i1078.m_MultipleSubstitutionRecords = i1080
  var i1083 = i1079[1]
  var i1082 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i1083.length; i += 1) {
    i1082.add(request.d('TMPro.LigatureSubstitutionRecord', i1083[i + 0]));
  }
  i1078.m_LigatureSubstitutionRecords = i1082
  var i1085 = i1079[2]
  var i1084 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i1085.length; i += 1) {
    i1084.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i1085[i + 0]));
  }
  i1078.m_GlyphPairAdjustmentRecords = i1084
  var i1087 = i1079[3]
  var i1086 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i1087.length; i += 1) {
    i1086.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i1087[i + 0]));
  }
  i1078.m_MarkToBaseAdjustmentRecords = i1086
  var i1089 = i1079[4]
  var i1088 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i1089.length; i += 1) {
    i1088.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i1089[i + 0]));
  }
  i1078.m_MarkToMarkAdjustmentRecords = i1088
  return i1078
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i1092 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i1093 = data
  i1092.m_TargetGlyphID = i1093[0]
  i1092.m_SubstituteGlyphIDs = i1093[1]
  return i1092
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i1096 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i1097 = data
  i1096.m_ComponentGlyphIDs = i1097[0]
  i1096.m_LigatureGlyphID = i1097[1]
  return i1096
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i1100 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i1101 = data
  i1100.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1101[0], i1100.m_FirstAdjustmentRecord)
  i1100.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1101[1], i1100.m_SecondAdjustmentRecord)
  i1100.m_FeatureLookupFlags = i1101[2]
  return i1100
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i1102 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i1103 = data
  i1102.m_GlyphIndex = i1103[0]
  i1102.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i1103[1], i1102.m_GlyphValueRecord)
  return i1102
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i1104 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i1105 = data
  i1104.m_XPlacement = i1105[0]
  i1104.m_YPlacement = i1105[1]
  i1104.m_XAdvance = i1105[2]
  i1104.m_YAdvance = i1105[3]
  return i1104
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i1108 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i1109 = data
  i1108.m_BaseGlyphID = i1109[0]
  i1108.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1109[1], i1108.m_BaseGlyphAnchorPoint)
  i1108.m_MarkGlyphID = i1109[2]
  i1108.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1109[3], i1108.m_MarkPositionAdjustment)
  return i1108
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i1112 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i1113 = data
  i1112.m_BaseMarkGlyphID = i1113[0]
  i1112.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1113[1], i1112.m_BaseMarkGlyphAnchorPoint)
  i1112.m_CombiningMarkGlyphID = i1113[2]
  i1112.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1113[3], i1112.m_CombiningMarkPositionAdjustment)
  return i1112
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i1118 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i1119 = data
  request.r(i1119[0], i1119[1], 0, i1118, 'regularTypeface')
  request.r(i1119[2], i1119[3], 0, i1118, 'italicTypeface')
  return i1118
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i1120 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i1121 = data
  i1120.Name = i1121[0]
  i1120.PointSize = i1121[1]
  i1120.Scale = i1121[2]
  i1120.CharacterCount = i1121[3]
  i1120.LineHeight = i1121[4]
  i1120.Baseline = i1121[5]
  i1120.Ascender = i1121[6]
  i1120.CapHeight = i1121[7]
  i1120.Descender = i1121[8]
  i1120.CenterLine = i1121[9]
  i1120.SuperscriptOffset = i1121[10]
  i1120.SubscriptOffset = i1121[11]
  i1120.SubSize = i1121[12]
  i1120.Underline = i1121[13]
  i1120.UnderlineThickness = i1121[14]
  i1120.strikethrough = i1121[15]
  i1120.strikethroughThickness = i1121[16]
  i1120.TabWidth = i1121[17]
  i1120.Padding = i1121[18]
  i1120.AtlasWidth = i1121[19]
  i1120.AtlasHeight = i1121[20]
  return i1120
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i1124 = root || request.c( 'TMPro.TMP_Glyph' )
  var i1125 = data
  i1124.id = i1125[0]
  i1124.x = i1125[1]
  i1124.y = i1125[2]
  i1124.width = i1125[3]
  i1124.height = i1125[4]
  i1124.xOffset = i1125[5]
  i1124.yOffset = i1125[6]
  i1124.xAdvance = i1125[7]
  i1124.scale = i1125[8]
  return i1124
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i1126 = root || request.c( 'TMPro.KerningTable' )
  var i1127 = data
  var i1129 = i1127[0]
  var i1128 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i1129.length; i += 1) {
    i1128.add(request.d('TMPro.KerningPair', i1129[i + 0]));
  }
  i1126.kerningPairs = i1128
  return i1126
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i1132 = root || request.c( 'TMPro.KerningPair' )
  var i1133 = data
  i1132.xOffset = i1133[0]
  i1132.m_FirstGlyph = i1133[1]
  i1132.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1133[2], i1132.m_FirstGlyphAdjustments)
  i1132.m_SecondGlyph = i1133[3]
  i1132.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1133[4], i1132.m_SecondGlyphAdjustments)
  i1132.m_IgnoreSpacingAdjustments = !!i1133[5]
  return i1132
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i1134 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i1135 = data
  i1134.m_FaceIndex = i1135[0]
  i1134.m_FamilyName = i1135[1]
  i1134.m_StyleName = i1135[2]
  i1134.m_PointSize = i1135[3]
  i1134.m_Scale = i1135[4]
  i1134.m_UnitsPerEM = i1135[5]
  i1134.m_LineHeight = i1135[6]
  i1134.m_AscentLine = i1135[7]
  i1134.m_CapLine = i1135[8]
  i1134.m_MeanLine = i1135[9]
  i1134.m_Baseline = i1135[10]
  i1134.m_DescentLine = i1135[11]
  i1134.m_SuperscriptOffset = i1135[12]
  i1134.m_SuperscriptSize = i1135[13]
  i1134.m_SubscriptOffset = i1135[14]
  i1134.m_SubscriptSize = i1135[15]
  i1134.m_UnderlineOffset = i1135[16]
  i1134.m_UnderlineThickness = i1135[17]
  i1134.m_StrikethroughOffset = i1135[18]
  i1134.m_StrikethroughThickness = i1135[19]
  i1134.m_TabWidth = i1135[20]
  return i1134
}

Deserializers["EquipmentSetData"] = function (request, data, root) {
  var i1136 = root || request.c( 'EquipmentSetData' )
  var i1137 = data
  request.r(i1137[0], i1137[1], 0, i1136, 'targetSkeletonDataAsset')
  var i1139 = i1137[2]
  var i1138 = new (System.Collections.Generic.List$1(Bridge.ns('System.String')))
  for(var i = 0; i < i1139.length; i += 1) {
    i1138.add(i1139[i + 0]);
  }
  i1136.skinNames = i1138
  var i1141 = i1137[3]
  var i1140 = new (System.Collections.Generic.List$1(Bridge.ns('SlotAttachmentPair')))
  for(var i = 0; i < i1141.length; i += 1) {
    i1140.add(request.d('SlotAttachmentPair', i1141[i + 0]));
  }
  i1136.equipmentSet = i1140
  return i1136
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i1142 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i1143 = data
  i1142.useSafeMode = !!i1143[0]
  i1142.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i1143[1], i1142.safeModeOptions)
  i1142.timeScale = i1143[2]
  i1142.unscaledTimeScale = i1143[3]
  i1142.useSmoothDeltaTime = !!i1143[4]
  i1142.maxSmoothUnscaledTime = i1143[5]
  i1142.rewindCallbackMode = i1143[6]
  i1142.showUnityEditorReport = !!i1143[7]
  i1142.logBehaviour = i1143[8]
  i1142.drawGizmos = !!i1143[9]
  i1142.defaultRecyclable = !!i1143[10]
  i1142.defaultAutoPlay = i1143[11]
  i1142.defaultUpdateType = i1143[12]
  i1142.defaultTimeScaleIndependent = !!i1143[13]
  i1142.defaultEaseType = i1143[14]
  i1142.defaultEaseOvershootOrAmplitude = i1143[15]
  i1142.defaultEasePeriod = i1143[16]
  i1142.defaultAutoKill = !!i1143[17]
  i1142.defaultLoopType = i1143[18]
  i1142.debugMode = !!i1143[19]
  i1142.debugStoreTargetId = !!i1143[20]
  i1142.showPreviewPanel = !!i1143[21]
  i1142.storeSettingsLocation = i1143[22]
  i1142.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i1143[23], i1142.modules)
  i1142.createASMDEF = !!i1143[24]
  i1142.showPlayingTweens = !!i1143[25]
  i1142.showPausedTweens = !!i1143[26]
  return i1142
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i1144 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i1145 = data
  i1144.logBehaviour = i1145[0]
  i1144.nestedTweenFailureBehaviour = i1145[1]
  return i1144
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i1146 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i1147 = data
  i1146.showPanel = !!i1147[0]
  i1146.audioEnabled = !!i1147[1]
  i1146.physicsEnabled = !!i1147[2]
  i1146.physics2DEnabled = !!i1147[3]
  i1146.spriteEnabled = !!i1147[4]
  i1146.uiEnabled = !!i1147[5]
  i1146.uiToolkitEnabled = !!i1147[6]
  i1146.textMeshProEnabled = !!i1147[7]
  i1146.tk2DEnabled = !!i1147[8]
  i1146.deAudioEnabled = !!i1147[9]
  i1146.deUnityExtendedEnabled = !!i1147[10]
  i1146.epoOutlineEnabled = !!i1147[11]
  return i1146
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i1148 = root || request.c( 'TMPro.TMP_Settings' )
  var i1149 = data
  i1148.assetVersion = i1149[0]
  i1148.m_TextWrappingMode = i1149[1]
  i1148.m_enableKerning = !!i1149[2]
  var i1151 = i1149[3]
  var i1150 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i1151.length; i += 1) {
    i1150.add(i1151[i + 0]);
  }
  i1148.m_ActiveFontFeatures = i1150
  i1148.m_enableExtraPadding = !!i1149[4]
  i1148.m_enableTintAllSprites = !!i1149[5]
  i1148.m_enableParseEscapeCharacters = !!i1149[6]
  i1148.m_EnableRaycastTarget = !!i1149[7]
  i1148.m_GetFontFeaturesAtRuntime = !!i1149[8]
  i1148.m_missingGlyphCharacter = i1149[9]
  i1148.m_ClearDynamicDataOnBuild = !!i1149[10]
  i1148.m_warningsDisabled = !!i1149[11]
  request.r(i1149[12], i1149[13], 0, i1148, 'm_defaultFontAsset')
  i1148.m_defaultFontAssetPath = i1149[14]
  i1148.m_defaultFontSize = i1149[15]
  i1148.m_defaultAutoSizeMinRatio = i1149[16]
  i1148.m_defaultAutoSizeMaxRatio = i1149[17]
  i1148.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i1149[18], i1149[19] )
  i1148.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i1149[20], i1149[21] )
  i1148.m_autoSizeTextContainer = !!i1149[22]
  i1148.m_IsTextObjectScaleStatic = !!i1149[23]
  var i1153 = i1149[24]
  var i1152 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1153.length; i += 2) {
  request.r(i1153[i + 0], i1153[i + 1], 1, i1152, '')
  }
  i1148.m_fallbackFontAssets = i1152
  i1148.m_matchMaterialPreset = !!i1149[25]
  i1148.m_HideSubTextObjects = !!i1149[26]
  request.r(i1149[27], i1149[28], 0, i1148, 'm_defaultSpriteAsset')
  i1148.m_defaultSpriteAssetPath = i1149[29]
  i1148.m_enableEmojiSupport = !!i1149[30]
  i1148.m_MissingCharacterSpriteUnicode = i1149[31]
  var i1155 = i1149[32]
  var i1154 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i1155.length; i += 2) {
  request.r(i1155[i + 0], i1155[i + 1], 1, i1154, '')
  }
  i1148.m_EmojiFallbackTextAssets = i1154
  i1148.m_defaultColorGradientPresetsPath = i1149[33]
  request.r(i1149[34], i1149[35], 0, i1148, 'm_defaultStyleSheet')
  i1148.m_StyleSheetsResourcePath = i1149[36]
  request.r(i1149[37], i1149[38], 0, i1148, 'm_leadingCharacters')
  request.r(i1149[39], i1149[40], 0, i1148, 'm_followingCharacters')
  i1148.m_UseModernHangulLineBreakingRules = !!i1149[41]
  return i1148
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i1158 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i1159 = data
  request.r(i1159[0], i1159[1], 0, i1158, 'spriteSheet')
  var i1161 = i1159[2]
  var i1160 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i1161.length; i += 1) {
    i1160.add(request.d('TMPro.TMP_Sprite', i1161[i + 0]));
  }
  i1158.spriteInfoList = i1160
  var i1163 = i1159[3]
  var i1162 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i1163.length; i += 2) {
  request.r(i1163[i + 0], i1163[i + 1], 1, i1162, '')
  }
  i1158.fallbackSpriteAssets = i1162
  var i1165 = i1159[4]
  var i1164 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i1165.length; i += 1) {
    i1164.add(request.d('TMPro.TMP_SpriteCharacter', i1165[i + 0]));
  }
  i1158.m_SpriteCharacterTable = i1164
  var i1167 = i1159[5]
  var i1166 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i1167.length; i += 1) {
    i1166.add(request.d('TMPro.TMP_SpriteGlyph', i1167[i + 0]));
  }
  i1158.m_GlyphTable = i1166
  i1158.m_Version = i1159[6]
  i1158.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1159[7], i1158.m_FaceInfo)
  request.r(i1159[8], i1159[9], 0, i1158, 'm_Material')
  return i1158
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i1170 = root || request.c( 'TMPro.TMP_Sprite' )
  var i1171 = data
  i1170.name = i1171[0]
  i1170.hashCode = i1171[1]
  i1170.unicode = i1171[2]
  i1170.pivot = new pc.Vec2( i1171[3], i1171[4] )
  request.r(i1171[5], i1171[6], 0, i1170, 'sprite')
  i1170.id = i1171[7]
  i1170.x = i1171[8]
  i1170.y = i1171[9]
  i1170.width = i1171[10]
  i1170.height = i1171[11]
  i1170.xOffset = i1171[12]
  i1170.yOffset = i1171[13]
  i1170.xAdvance = i1171[14]
  i1170.scale = i1171[15]
  return i1170
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i1176 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i1177 = data
  i1176.m_Name = i1177[0]
  i1176.m_ElementType = i1177[1]
  i1176.m_Unicode = i1177[2]
  i1176.m_GlyphIndex = i1177[3]
  i1176.m_Scale = i1177[4]
  return i1176
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i1180 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i1181 = data
  request.r(i1181[0], i1181[1], 0, i1180, 'sprite')
  i1180.m_Index = i1181[2]
  i1180.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1181[3], i1180.m_Metrics)
  i1180.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1181[4], i1180.m_GlyphRect)
  i1180.m_Scale = i1181[5]
  i1180.m_AtlasIndex = i1181[6]
  i1180.m_ClassDefinitionType = i1181[7]
  return i1180
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i1182 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i1183 = data
  var i1185 = i1183[0]
  var i1184 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i1185.length; i += 1) {
    i1184.add(request.d('TMPro.TMP_Style', i1185[i + 0]));
  }
  i1182.m_StyleList = i1184
  return i1182
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i1188 = root || request.c( 'TMPro.TMP_Style' )
  var i1189 = data
  i1188.m_Name = i1189[0]
  i1188.m_HashCode = i1189[1]
  i1188.m_OpeningDefinition = i1189[2]
  i1188.m_ClosingDefinition = i1189[3]
  i1188.m_OpeningTagArray = i1189[4]
  i1188.m_ClosingTagArray = i1189[5]
  return i1188
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1190 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1191 = data
  var i1193 = i1191[0]
  var i1192 = []
  for(var i = 0; i < i1193.length; i += 1) {
    i1192.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1193[i + 0]) );
  }
  i1190.files = i1192
  i1190.componentToPrefabIds = i1191[1]
  return i1190
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1196 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1197 = data
  i1196.path = i1197[0]
  request.r(i1197[1], i1197[2], 0, i1196, 'unityObject')
  return i1196
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1198 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1199 = data
  var i1201 = i1199[0]
  var i1200 = []
  for(var i = 0; i < i1201.length; i += 1) {
    i1200.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1201[i + 0]) );
  }
  i1198.scriptsExecutionOrder = i1200
  var i1203 = i1199[1]
  var i1202 = []
  for(var i = 0; i < i1203.length; i += 1) {
    i1202.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1203[i + 0]) );
  }
  i1198.sortingLayers = i1202
  var i1205 = i1199[2]
  var i1204 = []
  for(var i = 0; i < i1205.length; i += 1) {
    i1204.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1205[i + 0]) );
  }
  i1198.cullingLayers = i1204
  i1198.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1199[3], i1198.timeSettings)
  i1198.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1199[4], i1198.physicsSettings)
  i1198.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1199[5], i1198.physics2DSettings)
  i1198.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1199[6], i1198.qualitySettings)
  i1198.enableRealtimeShadows = !!i1199[7]
  i1198.enableAutoInstancing = !!i1199[8]
  i1198.enableStaticBatching = !!i1199[9]
  i1198.enableDynamicBatching = !!i1199[10]
  i1198.lightmapEncodingQuality = i1199[11]
  i1198.desiredColorSpace = i1199[12]
  var i1207 = i1199[13]
  var i1206 = []
  for(var i = 0; i < i1207.length; i += 1) {
    i1206.push( i1207[i + 0] );
  }
  i1198.allTags = i1206
  return i1198
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1210 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1211 = data
  i1210.name = i1211[0]
  i1210.value = i1211[1]
  return i1210
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1214 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1215 = data
  i1214.id = i1215[0]
  i1214.name = i1215[1]
  i1214.value = i1215[2]
  return i1214
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1218 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1219 = data
  i1218.id = i1219[0]
  i1218.name = i1219[1]
  return i1218
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1220 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1221 = data
  i1220.fixedDeltaTime = i1221[0]
  i1220.maximumDeltaTime = i1221[1]
  i1220.timeScale = i1221[2]
  i1220.maximumParticleTimestep = i1221[3]
  return i1220
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1222 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1223 = data
  i1222.gravity = new pc.Vec3( i1223[0], i1223[1], i1223[2] )
  i1222.defaultSolverIterations = i1223[3]
  i1222.bounceThreshold = i1223[4]
  i1222.autoSyncTransforms = !!i1223[5]
  i1222.autoSimulation = !!i1223[6]
  var i1225 = i1223[7]
  var i1224 = []
  for(var i = 0; i < i1225.length; i += 1) {
    i1224.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1225[i + 0]) );
  }
  i1222.collisionMatrix = i1224
  return i1222
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1228 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1229 = data
  i1228.enabled = !!i1229[0]
  i1228.layerId = i1229[1]
  i1228.otherLayerId = i1229[2]
  return i1228
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1230 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1231 = data
  request.r(i1231[0], i1231[1], 0, i1230, 'material')
  i1230.gravity = new pc.Vec2( i1231[2], i1231[3] )
  i1230.positionIterations = i1231[4]
  i1230.velocityIterations = i1231[5]
  i1230.velocityThreshold = i1231[6]
  i1230.maxLinearCorrection = i1231[7]
  i1230.maxAngularCorrection = i1231[8]
  i1230.maxTranslationSpeed = i1231[9]
  i1230.maxRotationSpeed = i1231[10]
  i1230.baumgarteScale = i1231[11]
  i1230.baumgarteTOIScale = i1231[12]
  i1230.timeToSleep = i1231[13]
  i1230.linearSleepTolerance = i1231[14]
  i1230.angularSleepTolerance = i1231[15]
  i1230.defaultContactOffset = i1231[16]
  i1230.autoSimulation = !!i1231[17]
  i1230.queriesHitTriggers = !!i1231[18]
  i1230.queriesStartInColliders = !!i1231[19]
  i1230.callbacksOnDisable = !!i1231[20]
  i1230.reuseCollisionCallbacks = !!i1231[21]
  i1230.autoSyncTransforms = !!i1231[22]
  var i1233 = i1231[23]
  var i1232 = []
  for(var i = 0; i < i1233.length; i += 1) {
    i1232.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1233[i + 0]) );
  }
  i1230.collisionMatrix = i1232
  return i1230
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1236 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1237 = data
  i1236.enabled = !!i1237[0]
  i1236.layerId = i1237[1]
  i1236.otherLayerId = i1237[2]
  return i1236
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1238 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1239 = data
  var i1241 = i1239[0]
  var i1240 = []
  for(var i = 0; i < i1241.length; i += 1) {
    i1240.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1241[i + 0]) );
  }
  i1238.qualityLevels = i1240
  var i1243 = i1239[1]
  var i1242 = []
  for(var i = 0; i < i1243.length; i += 1) {
    i1242.push( i1243[i + 0] );
  }
  i1238.names = i1242
  i1238.shadows = i1239[2]
  i1238.anisotropicFiltering = i1239[3]
  i1238.antiAliasing = i1239[4]
  i1238.lodBias = i1239[5]
  i1238.shadowCascades = i1239[6]
  i1238.shadowDistance = i1239[7]
  i1238.shadowmaskMode = i1239[8]
  i1238.shadowProjection = i1239[9]
  i1238.shadowResolution = i1239[10]
  i1238.softParticles = !!i1239[11]
  i1238.softVegetation = !!i1239[12]
  i1238.activeColorSpace = i1239[13]
  i1238.desiredColorSpace = i1239[14]
  i1238.masterTextureLimit = i1239[15]
  i1238.maxQueuedFrames = i1239[16]
  i1238.particleRaycastBudget = i1239[17]
  i1238.pixelLightCount = i1239[18]
  i1238.realtimeReflectionProbes = !!i1239[19]
  i1238.shadowCascade2Split = i1239[20]
  i1238.shadowCascade4Split = new pc.Vec3( i1239[21], i1239[22], i1239[23] )
  i1238.streamingMipmapsActive = !!i1239[24]
  i1238.vSyncCount = i1239[25]
  i1238.asyncUploadBufferSize = i1239[26]
  i1238.asyncUploadTimeSlice = i1239[27]
  i1238.billboardsFaceCameraPosition = !!i1239[28]
  i1238.shadowNearPlaneOffset = i1239[29]
  i1238.streamingMipmapsMemoryBudget = i1239[30]
  i1238.maximumLODLevel = i1239[31]
  i1238.streamingMipmapsAddAllCameras = !!i1239[32]
  i1238.streamingMipmapsMaxLevelReduction = i1239[33]
  i1238.streamingMipmapsRenderersPerFrame = i1239[34]
  i1238.resolutionScalingFixedDPIFactor = i1239[35]
  i1238.streamingMipmapsMaxFileIORequests = i1239[36]
  i1238.currentQualityLevel = i1239[37]
  return i1238
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i1248 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i1249 = data
  i1248.weight = i1249[0]
  i1248.vertices = i1249[1]
  i1248.normals = i1249[2]
  i1248.tangents = i1249[3]
  return i1248
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition"] = function (request, data, root) {
  var i1252 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition' )
  var i1253 = data
  i1252.mode = i1253[0]
  i1252.parameter = i1253[1]
  i1252.threshold = i1253[2]
  return i1252
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i1254 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i1255 = data
  i1254.m_XCoordinate = i1255[0]
  i1254.m_YCoordinate = i1255[1]
  return i1254
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i1256 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i1257 = data
  i1256.m_XPositionAdjustment = i1257[0]
  i1256.m_YPositionAdjustment = i1257[1]
  return i1256
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i1258 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i1259 = data
  i1258.xPlacement = i1259[0]
  i1258.yPlacement = i1259[1]
  i1258.xAdvance = i1259[2]
  i1258.yAdvance = i1259[3]
  return i1258
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Components.Animator":{"animatorController":0,"avatar":2,"updateMode":4,"hasTransformHierarchy":5,"applyRootMotion":6,"humanBones":7,"enabled":8},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer":{"color":0,"sprite":4,"flipX":6,"flipY":7,"drawMode":8,"size":9,"tileMode":11,"adaptiveModeThreshold":12,"maskInteraction":13,"spriteSortPoint":14,"enabled":15,"sharedMaterial":16,"sharedMaterials":18,"receiveShadows":19,"shadowCastingMode":20,"sortingLayerID":21,"sortingOrder":22,"lightmapIndex":23,"lightmapSceneIndex":24,"lightmapScaleOffset":25,"lightProbeUsage":29,"reflectionProbeUsage":30},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"referenceAmbientProbe":36,"useReferenceAmbientProbe":37,"customReflection":38,"defaultReflection":40,"defaultReflectionMode":42,"defaultReflectionResolution":43,"sunLightObjectId":44,"pixelLightCount":45,"defaultReflectionHDR":46,"hasLightDataAsset":47,"hasManualGenerate":48},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController":{"name":0,"layers":1,"parameters":2,"animationClips":3,"avatarUnsupported":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer":{"name":0,"defaultWeight":1,"blendingMode":2,"avatarMask":3,"syncedLayerIndex":4,"syncedLayerAffectsTiming":5,"syncedLayers":6,"stateMachine":7},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine":{"id":0,"name":1,"path":2,"states":3,"machines":4,"entryStateTransitions":5,"exitStateTransitions":6,"anyStateTransitions":7,"defaultStateId":8},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState":{"id":0,"name":1,"cycleOffset":2,"cycleOffsetParameter":3,"cycleOffsetParameterActive":4,"mirror":5,"mirrorParameter":6,"mirrorParameterActive":7,"motionId":8,"nameHash":9,"fullPathHash":10,"speed":11,"speedParameter":12,"speedParameterActive":13,"tag":14,"tagHash":15,"writeDefaultValues":16,"behaviours":17,"transitions":18},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition":{"fullPath":0,"canTransitionToSelf":1,"duration":2,"exitTime":3,"hasExitTime":4,"hasFixedDuration":5,"interruptionSource":6,"offset":7,"orderedInterruption":8,"destinationStateId":9,"isExit":10,"mute":11,"solo":12,"conditions":13},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition":{"destinationStateId":0,"isExit":1,"mute":2,"solo":3,"conditions":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter":{"defaultBool":0,"defaultFloat":1,"defaultInt":2,"name":3,"nameHash":4,"type":5},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"lightmapEncodingQuality":11,"desiredColorSpace":12,"allTags":13},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition":{"mode":0,"parameter":1,"threshold":2}}

Deserializers.requiredComponents = {"44":[45],"46":[45],"47":[45],"48":[45],"49":[45],"50":[45],"51":[52],"53":[2],"54":[55],"56":[55],"57":[55],"58":[55],"59":[55],"60":[55],"61":[62],"63":[62],"64":[62],"65":[62],"66":[62],"67":[62],"68":[62],"69":[62],"70":[62],"71":[62],"72":[62],"73":[62],"74":[62],"75":[2],"76":[29],"77":[78],"79":[78],"80":[31],"5":[2],"81":[82],"83":[31],"84":[85,31],"30":[29],"86":[85,31],"87":[18,29],"88":[29],"89":[29,27],"90":[55],"91":[62],"92":[82],"93":[94],"95":[23],"96":[2],"97":[98],"99":[35],"100":[80],"101":[31],"33":[29,31],"102":[31,85],"103":[31],"104":[85,31],"105":[29],"106":[85,31],"107":[31],"108":[109],"110":[109],"111":[109],"112":[31],"113":[31],"114":[80],"115":[85,31],"116":[31],"117":[80],"118":[31],"119":[31],"120":[31],"121":[31],"122":[31],"123":[31],"124":[31],"125":[31],"126":[31],"127":[85,31],"128":[31],"129":[31],"130":[31],"131":[31],"132":[85,31],"133":[31],"134":[35],"135":[35],"36":[35],"136":[35],"137":[2],"138":[2]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.MonoBehaviour","AutoCameraFit","UnityEngine.Transform","CharacterManager","Character","EquipmentSetData","Spine.Unity.SkeletonDataAsset","GameManager","SlotManager","SlotSetup","Ply_Pool","Ply_SoundManager","UnityEngine.AudioClip","UnityEngine.AudioSource","UnityEngine.Animator","UnityEditor.Animations.AnimatorController","UnityEngine.CapsuleCollider","BalloonController","UnityEngine.GameObject","UnityEngine.SpriteRenderer","UnityEngine.Sprite","UnityEngine.Material","SlotDataSO","UnityEngine.MeshFilter","UnityEngine.Mesh","UnityEngine.MeshRenderer","Spine.Unity.SkeletonAnimation","UnityEngine.RectTransform","UnityEngine.EventSystems.UIBehaviour","TMPro.TextMeshPro","TMPro.TMP_FontAsset","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","Spine.Unity.SpineAtlasAsset","UnityEngine.TextAsset","UnityEngine.Font","DG.Tweening.Core.DOTweenSettings","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.Canvas","Spine.Unity.EditorSkeletonPlayer","Spine.Unity.ISkeletonAnimation","Spine.Unity.BoneFollowerGraphic","Spine.Unity.SkeletonSubmeshGraphic","UnityEngine.CanvasRenderer","Spine.Unity.SkeletonGraphic","Spine.Unity.SkeletonMecanim","Spine.Unity.SkeletonRenderer","Spine.Unity.SkeletonPartsRenderer","Spine.Unity.FollowLocationRigidbody","Spine.Unity.FollowLocationRigidbody2D","Spine.Unity.SkeletonUtility","Spine.Unity.SkeletonUtilityConstraint","Spine.Unity.SkeletonUtilityBone","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","UnityEngine.InputSystem.UI.InputSystemUIInputModule","UnityEngine.InputSystem.UI.TrackedDeviceRaycaster","TMPro.TextContainer","TMPro.TextMeshProUGUI","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.GraphicRaycaster","UnityEngine.UI.Image","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.CanvasScaler","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.ScrollRect","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.38f1";

Deserializers.productName = "PLY_LeftOrRight";

Deserializers.lunaInitializationTime = "07/24/2026 10:13:04";

Deserializers.lunaDaysRunning = "0.0";

Deserializers.lunaVersion = "7.1.0";

Deserializers.lunaSHA = "cf93782349542fe0b84ad13951a26809f8419628";

Deserializers.creativeName = "";

Deserializers.lunaAppID = "0";

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

Deserializers.runtimeAnalysisExcludedClassesCount = "0";

Deserializers.runtimeAnalysisExcludedMethodsCount = "0";

Deserializers.runtimeAnalysisExcludedModules = "";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isReferenceAmbientProbeBaked = "False";

Deserializers.isLunaCompilerV2Used = "True";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "StandaloneWindows64";

Deserializers.applicationIdentifier = "com.DefaultCompany.PLY-LeftOrRight";

Deserializers.disableAntiAliasing = false;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = false;

Deserializers.buildID = "d42373f4-1a5b-4287-b838-071b74d78f22";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","Services","Core","Internal","UnityServicesInitializer","EnableServicesInitializationAsync"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["DG","Tweening","DOTween","RuntimeOnLoad"],["Sirenix","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","UnitySerializationInitializer","InitializeRuntime"],["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["Unity","Services","Core","Registration","CorePackageInitializer","InitializeOnLoad"],["Unity","Services","Core","Internal","TaskAsyncOperation","SetScheduler"],["Unity","Services","Core","Environments","Client","Scheduler","EngineStateHelper","Init"],["Unity","Services","Core","Environments","Client","Scheduler","ThreadHelper","Init"],["Ua2CoreInitializeCallback","Register"],["UnityEngine","InputSystem","InputSystem","RunInitialUpdate"],["Unity","AI","Navigation","NavMeshLink","ClearTrackedList"],["Unity","AI","Navigation","NavMeshSurface","ClearNavMeshSurfaces"],["Unity","AI","Navigation","NavMeshModifierVolume","ClearNavMeshModifiers"],["Unity","AI","Navigation","NavMeshModifier","ClearNavMeshModifiers"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["Unity","Services","Core","Internal","UnityServicesInitializer","CreateStaticInstance"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[["Unity","Services","Core","Environments","Client","Http","JsonHelpers","RegisterTypesForAOT"]],[["Unity","Services","Core","UnityThreadUtils","CaptureUnityThreadInfo"],["UnityEngine","InputSystem","Plugins","InputForUI","InputSystemProvider","Bootstrap"],["UnityEngine","InputSystem","InputSystem","RunInitializeInPlayer"],["Spine","Unity","AttachmentTools","AtlasUtilities","Init"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

